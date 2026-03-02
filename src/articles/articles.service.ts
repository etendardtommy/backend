import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) { }

  private processFiles(data: any, files: { coverImage?: Express.Multer.File[], htmlFile?: Express.Multer.File[] }) {
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
        // FormData might send 'tags[0]=a&tags[1]=b' or a JSON string. Assuming we send JSON stringified array or comma separated
        finalData.tags = finalData.tags.includes('[')
          ? JSON.parse(finalData.tags)
          : finalData.tags.split(',').map((t: string) => t.trim());
      } catch {
        finalData.tags = [];
      }
    }

    // Process uploaded HTML file
    if (files && files.htmlFile && files.htmlFile.length > 0) {
      const htmlFilePath = files.htmlFile[0].path;
      try {
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
        finalData.htmlContent = htmlContent;
        // Optionally delete the physical .html file after reading it to save space
        fs.unlinkSync(htmlFilePath);
      } catch (err) {
        console.error("Erreur lors de la lecture du fichier HTML", err);
      }
    }

    // Process uploaded Cover Image
    if (files && files.coverImage && files.coverImage.length > 0) {
      // Create a public URL path (assuming backend runs on localhost:3000 for now, or just relative path)
      const imagePath = `/uploads/${files.coverImage[0].filename}`;
      finalData.imageUrl = imagePath;
    }

    return finalData;
  }

  async create(createArticleDto: any, files: { coverImage?: Express.Multer.File[], htmlFile?: Express.Multer.File[] }) {
    const processedData = this.processFiles(createArticleDto, files);
    const { siteId, ...articleData } = processedData;

    if (!siteId) throw new NotFoundException('siteId manquant');

    // Verify if site exists
    const site = await this.prisma.site.findUnique({ where: { id: siteId } });
    if (!site) {
      throw new NotFoundException(`Le site avec l'ID ${siteId} n'existe pas`);
    }

    return this.prisma.article.create({
      data: {
        ...articleData,
        site: {
          connect: { id: siteId }
        }
      },
    });
  }

  async findAll(siteId?: number) {
    const whereClause = siteId ? { siteId } : {};
    return this.prisma.article.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        site: {
          select: { name: true }
        }
      }
    });
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

    return article;
  }

  async update(id: number, updateArticleDto: any, files: { coverImage?: Express.Multer.File[], htmlFile?: Express.Multer.File[] }) {
    await this.findOne(id); // Ensure article exists

    const processedData = this.processFiles(updateArticleDto, files);
    const { siteId, ...articleData } = processedData;

    return this.prisma.article.update({
      where: { id },
      data: articleData,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure article exists

    return this.prisma.article.delete({
      where: { id },
    });
  }
}
