import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';

@Injectable()
export class GalleryService {
    constructor(private prisma: PrismaService) { }

    private formatGalleryUrl(item: any) {
        if (!item) return item;
        const port = process.env.PORT || 3000;
        const appUrl = process.env.APP_URL || `http://localhost:${port}`;
        return {
            ...item,
            imageUrl: item.imageUrl?.startsWith('http') ? item.imageUrl : (item.imageUrl ? `${appUrl}${item.imageUrl}` : null),
            videoUrl: item.videoUrl?.startsWith('http') ? item.videoUrl : (item.videoUrl ? `${appUrl}${item.videoUrl}` : null),
        };
    }

    async create(dto: any, siteId: number, files?: { imageFile?: Express.Multer.File[], videoFile?: Express.Multer.File[] }) {
        let imageUrl = dto.imageUrl;
        let videoUrl = dto.videoUrl;

        if (files?.imageFile?.[0]) {
            imageUrl = `/uploads/${files.imageFile[0].filename}`;
        }
        if (files?.videoFile?.[0]) {
            videoUrl = `/uploads/${files.videoFile[0].filename}`;
        }

        const published = dto.published === 'true' || dto.published === true;
        const tags = Array.isArray(dto.tags) ? dto.tags : (typeof dto.tags === 'string' && dto.tags ? dto.tags.split(',').map((t: string) => t.trim()) : []);

        const item = await this.prisma.galleryItem.create({
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
        return this.formatGalleryUrl(item);
    }

    async findAll(siteId: number) {
        const items = await this.prisma.galleryItem.findMany({
            where: { siteId },
            orderBy: { createdAt: 'desc' },
        });
        return items.map(i => this.formatGalleryUrl(i));
    }

    async findPublished(siteId: number) {
        const items = await this.prisma.galleryItem.findMany({
            where: { siteId, published: true },
            orderBy: { createdAt: 'desc' },
        });
        return items.map(i => this.formatGalleryUrl(i));
    }

    async findOne(id: number) {
        const item = await this.prisma.galleryItem.findUnique({ where: { id } });
        return this.formatGalleryUrl(item);
    }

    async update(id: number, dto: any, files?: { imageFile?: Express.Multer.File[], videoFile?: Express.Multer.File[] }) {
        const data: any = { ...dto };

        if (files?.imageFile?.[0]) {
            data.imageUrl = `/uploads/${files.imageFile[0].filename}`;
        }
        if (files?.videoFile?.[0]) {
            data.videoUrl = `/uploads/${files.videoFile[0].filename}`;
        }

        if (data.published !== undefined) {
            data.published = data.published === 'true' || data.published === true;
        }

        if (data.tags !== undefined) {
            data.tags = Array.isArray(data.tags) ? data.tags : (typeof data.tags === 'string' && data.tags ? data.tags.split(',').map((t: string) => t.trim()) : []);
        }

        const updatedItem = await this.prisma.galleryItem.update({
            where: { id },
            data,
        });
        return this.formatGalleryUrl(updatedItem);
    }

    async remove(id: number) {
        const deletedItem = await this.prisma.galleryItem.delete({ where: { id } });
        return this.formatGalleryUrl(deletedItem);
    }
}
