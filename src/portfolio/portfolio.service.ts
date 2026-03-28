import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) { }

  private formatProjectUrl(project: any) {
    if (!project) return project;
    const port = process.env.PORT || 3000;
    const appUrl = process.env.APP_URL || `http://localhost:${port}`;
    return {
      ...project,
      imageUrl: project.imageUrl?.startsWith('http') ? project.imageUrl : (project.imageUrl ? `${appUrl}${project.imageUrl}` : null)
    };
  }

  private processFiles(dto: any, coverImage?: Express.Multer.File) {
    const data: any = { ...dto };

    if (coverImage) {
      data.imageUrl = `/uploads/${coverImage.filename}`;
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
    const project = await this.prisma.project.create({
      data: {
        ...data,
        siteId,
      },
    });
    return this.formatProjectUrl(project);
  }

  async findAll(siteId: number) {
    const projects = await this.prisma.project.findMany({
      where: { siteId },
      orderBy: { createdAt: 'desc' },
    });
    return projects.map(p => this.formatProjectUrl(p));
  }

  async findOne(id: number, siteId: number) {
    const project = await this.prisma.project.findFirst({
      where: { id, siteId },
    });

    if (!project) {
      throw new NotFoundException(`Le projet avec l'ID ${id} n'a pas été trouvé`);
    }

    return this.formatProjectUrl(project);
  }

  async update(id: number, siteId: number, updatePortfolioDto: any, coverImage?: Express.Multer.File) {
    // Vérifier si le projet existe et appartient au site
    await this.findOne(id, siteId);

    const data = this.processFiles(updatePortfolioDto, coverImage);

    const updatedProject = await this.prisma.project.update({
      where: { id },
      data,
    });
    return this.formatProjectUrl(updatedProject);
  }

  async remove(id: number, siteId: number) {
    await this.findOne(id, siteId);

    const deletedProject = await this.prisma.project.delete({
      where: { id },
    });
    return this.formatProjectUrl(deletedProject);
  }
}
