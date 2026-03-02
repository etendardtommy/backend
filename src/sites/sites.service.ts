import { Injectable } from '@nestjs/common';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SitesService {
  constructor(private prisma: PrismaService) { }
  create(createSiteDto: CreateSiteDto) {
    return this.prisma.site.create({ data: createSiteDto });
  }

  findAll() {
    return this.prisma.site.findMany({ orderBy: { createdAt: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.site.findUnique({ where: { id } });
  }

  update(id: number, updateSiteDto: UpdateSiteDto) {
    return this.prisma.site.update({ where: { id }, data: updateSiteDto });
  }

  remove(id: number) {
    return this.prisma.site.delete({ where: { id } });
  }
}
