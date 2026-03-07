import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExperienceService {
  constructor(private readonly prisma: PrismaService) { }

  async create(siteId: number, createExperienceDto: CreateExperienceDto) {
    return this.prisma.experience.create({
      data: {
        ...createExperienceDto,
        siteId,
      },
    });
  }

  async findAll(siteId: number) {
    return this.prisma.experience.findMany({
      where: { siteId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllPublic(siteId: number) {
    return this.prisma.experience.findMany({
      where: { siteId, published: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number, siteId: number) {
    const experience = await this.prisma.experience.findFirst({
      where: { id, siteId },
    });
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found for this site`);
    }
    return experience;
  }

  async update(id: number, siteId: number, updateExperienceDto: UpdateExperienceDto) {
    await this.findOne(id, siteId); // check exists
    return this.prisma.experience.update({
      where: { id },
      data: updateExperienceDto,
    });
  }

  async remove(id: number, siteId: number) {
    await this.findOne(id, siteId); // check exists
    return this.prisma.experience.delete({
      where: { id },
    });
  }
}
