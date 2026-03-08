import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';

@Injectable()
export class GalleryService {
    constructor(private prisma: PrismaService) { }

    create(dto: any, siteId: number, files?: { imageFile?: Express.Multer.File[], videoFile?: Express.Multer.File[] }) {
        const port = process.env.PORT || 3000;
        const appUrl = process.env.APP_URL || `http://localhost:${port}`;

        let imageUrl = dto.imageUrl;
        let videoUrl = dto.videoUrl;

        if (files?.imageFile?.[0]) {
            imageUrl = `${appUrl}/uploads/${files.imageFile[0].filename}`;
        }
        if (files?.videoFile?.[0]) {
            videoUrl = `${appUrl}/uploads/${files.videoFile[0].filename}`;
        }

        const published = dto.published === 'true' || dto.published === true;
        const tags = Array.isArray(dto.tags) ? dto.tags : (typeof dto.tags === 'string' && dto.tags ? dto.tags.split(',').map((t: string) => t.trim()) : []);

        return this.prisma.galleryItem.create({
            data: {
                title: dto.title,
                type: dto.type,
                description: dto.description || null,
                category: dto.category || null,
                imageUrl: imageUrl || null,
                videoUrl: videoUrl || null,
                published,
                tags,
                siteId,
            },
        });
    }

    findAll(siteId: number) {
        return this.prisma.galleryItem.findMany({
            where: { siteId },
            orderBy: { createdAt: 'desc' },
        });
    }

    findPublished(siteId: number) {
        return this.prisma.galleryItem.findMany({
            where: { siteId, published: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    findOne(id: number) {
        return this.prisma.galleryItem.findUnique({ where: { id } });
    }

    update(id: number, dto: any, files?: { imageFile?: Express.Multer.File[], videoFile?: Express.Multer.File[] }) {
        const port = process.env.PORT || 3000;
        const appUrl = process.env.APP_URL || `http://localhost:${port}`;

        const data: any = { ...dto };

        if (files?.imageFile?.[0]) {
            data.imageUrl = `${appUrl}/uploads/${files.imageFile[0].filename}`;
        }
        if (files?.videoFile?.[0]) {
            data.videoUrl = `${appUrl}/uploads/${files.videoFile[0].filename}`;
        }

        if (data.published !== undefined) {
            data.published = data.published === 'true' || data.published === true;
        }

        if (data.tags !== undefined) {
            data.tags = Array.isArray(data.tags) ? data.tags : (typeof data.tags === 'string' && data.tags ? data.tags.split(',').map((t: string) => t.trim()) : []);
        }

        return this.prisma.galleryItem.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.galleryItem.delete({ where: { id } });
    }
}
