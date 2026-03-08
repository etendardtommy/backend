import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) { }

  private processFiles(dto: any, coverImage?: Express.Multer.File) {
    const port = process.env.PORT || 3000;
    const appUrl = process.env.APP_URL || `http://localhost:${port}`;
    const data: any = { ...dto };

    if (coverImage) {
      data.imageUrl = `${appUrl}/uploads/${coverImage.filename}`;
    }

    if (typeof data.technologies === 'string') {
      try {
        data.technologies = JSON.parse(data.technologies);
      } catch (e) {
        data.technologies = [];
      }
    } else if (!data.technologies) {
      data.technologies = [];
    }

    if (data.published !== undefined) {
      data.published = data.published === 'true' || data.published === true;
    }

    return data;
  }

  async create(siteId: number, createPortfolioDto: any, coverImage?: Express.Multer.File) {
    const data = this.processFiles(createPortfolioDto, coverImage);
    return this.prisma.project.create({
      data: {
        ...data,
        siteId,
      },
    });
  }

  async findAll(siteId: number) {
    return this.prisma.project.findMany({
      where: { siteId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, siteId: number) {
    const project = await this.prisma.project.findFirst({
      where: { id, siteId },
    });

    if (!project) {
      throw new NotFoundException(`Le projet avec l'ID ${id} n'a pas été trouvé`);
    }

    return project;
  }

  async update(id: number, siteId: number, updatePortfolioDto: any, coverImage?: Express.Multer.File) {
    // Vérifier si le projet existe et appartient au site
    await this.findOne(id, siteId);

    const data = this.processFiles(updatePortfolioDto, coverImage);

    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: number, siteId: number) {
    await this.findOne(id, siteId);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
