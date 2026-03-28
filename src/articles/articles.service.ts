import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) { }

  private formatArticleUrl(article: any) {
    if (!article) return article;
    const port = process.env.PORT || 3000;
    const appUrl = process.env.APP_URL || `http://localhost:${port}`;
    return {
      ...article,
      imageUrl: article.imageUrl?.startsWith('http') ? article.imageUrl : (article.imageUrl ? `${appUrl}${article.imageUrl}` : null)
    };
  }

  private processFiles(data: any, files: { coverImage?: Express.Multer.File[] }) {
    let finalData = { ...data };

    // Convert stringified fields back from FormData
    if (finalData.published !== undefined) {
      finalData.published = finalData.published === 'true';
    }
    if (finalData.siteId) {
      finalData.siteId = parseInt(finalData.siteId, 10);
    }
    if (finalData.tags && typeof finalData.tags === 'string') {
      try {
        finalData.tags = finalData.tags.includes('[')
          ? JSON.parse(finalData.tags)
          : finalData.tags.split(',').map((t: string) => t.trim());
      } catch {
        finalData.tags = [];
      }
    }

    // Process uploaded Cover Image
    if (files && files.coverImage && files.coverImage.length > 0) {
      finalData.imageUrl = `/uploads/${files.coverImage[0].filename}`;
    }

    return finalData;
  }

  async create(createArticleDto: any, files: { coverImage?: Express.Multer.File[] }) {
    const processedData = this.processFiles(createArticleDto, files);
    const { siteId, ...articleData } = processedData;

    if (!siteId) throw new NotFoundException('siteId manquant');

    // Verify if site exists
    const site = await this.prisma.site.findUnique({ where: { id: siteId } });
    if (!site) {
      throw new NotFoundException(`Le site avec l'ID ${siteId} n'existe pas`);
    }

    const article = await this.prisma.article.create({
      data: {
        ...articleData,
        site: {
          connect: { id: siteId }
        }
      },
      include: {
        site: {
          select: { name: true }
        }
      }
    });
    return this.formatArticleUrl(article);
  }

  async findAll(siteId?: number) {
    const whereClause = siteId ? { siteId } : {};
    const articles = await this.prisma.article.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        site: {
          select: { name: true }
        }
      }
    });
    return articles.map(a => this.formatArticleUrl(a));
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        site: {
          select: { name: true }
        }
      }
    });

    if (!article) {
      throw new NotFoundException(`Article avec l'ID ${id} non trouvé`);
    }

    return this.formatArticleUrl(article);
  }

  async update(id: number, updateArticleDto: any, files: { coverImage?: Express.Multer.File[] }) {
    await this.findOne(id); // Ensure article exists

    const processedData = this.processFiles(updateArticleDto, files);
    const { siteId, ...articleData } = processedData;

    const updatedArticle = await this.prisma.article.update({
      where: { id },
      data: articleData,
      include: {
        site: {
          select: { name: true }
        }
      }
    });
    return this.formatArticleUrl(updatedArticle);
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure article exists

    const deletedArticle = await this.prisma.article.delete({
      where: { id },
      include: {
        site: {
          select: { name: true }
        }
      }
    });
    return this.formatArticleUrl(deletedArticle);
  }

  uploadImage(file: Express.Multer.File) {
    if (!file) {
      throw new Error('Aucun fichier fourni');
    }
    const port = process.env.PORT || 3000;
    const appUrl = process.env.APP_URL || `http://localhost:${port}`;
    return { url: `${appUrl}/uploads/${file.filename}` };
  }
}
