import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RosterService {
    constructor(private prisma: PrismaService) { }

    private processFile(dto: any, photoFile?: Express.Multer.File) {
        const port = process.env.PORT || 3000;
        const appUrl = process.env.APP_URL || `http://localhost:${port}`;
        const data: any = { ...dto };

        if (photoFile) {
            data.photoUrl = `${appUrl}/uploads/${photoFile.filename}`;
        }

        return data;
    }

    async create(siteId: number, createDto: any, photoFile?: Express.Multer.File) {
        const data = this.processFile(createDto, photoFile);

        return this.prisma.rosterItem.create({
            data: {
                name: data.name,
                number: data.number || null,
                photoUrl: data.photoUrl || null,
                siteId,
            },
        });
    }

    async findAll(siteId: number) {
        return this.prisma.rosterItem.findMany({
            where: { siteId },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: number, siteId: number) {
        const item = await this.prisma.rosterItem.findFirst({
            where: { id, siteId },
        });

        if (!item) {
            throw new NotFoundException(`Le joueur avec l'ID ${id} n'a pas été trouvé`);
        }

        return item;
    }

    async update(id: number, siteId: number, updateDto: any, photoFile?: Express.Multer.File) {
        await this.findOne(id, siteId); // Vérifier l'existence

        const data = this.processFile(updateDto, photoFile);

        return this.prisma.rosterItem.update({
            where: { id },
            data: {
                name: data.name,
                number: data.number,
                photoUrl: data.photoUrl,
            },
        });
    }

    async remove(id: number, siteId: number) {
        await this.findOne(id, siteId);

        return this.prisma.rosterItem.delete({
            where: { id },
        });
    }
}
