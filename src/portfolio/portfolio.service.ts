import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PortfolioService {
  constructor(private readonly prisma: PrismaService) { }

  async create(siteId: number, createPortfolioDto: CreatePortfolioDto) {
    return this.prisma.project.create({
      data: {
        ...createPortfolioDto,
        technologies: createPortfolioDto.technologies || [],
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

  async update(id: number, siteId: number, updatePortfolioDto: UpdatePortfolioDto) {
    // Vérifier si le projet existe et appartient au site
    await this.findOne(id, siteId);

    return this.prisma.project.update({
      where: { id },
      data: updatePortfolioDto,
    });
  }

  async remove(id: number, siteId: number) {
    await this.findOne(id, siteId);

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
