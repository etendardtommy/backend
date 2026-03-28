"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GalleryService = class GalleryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    formatGalleryUrl(item) {
        if (!item)
            return item;
        const port = process.env.PORT || 3000;
        const appUrl = process.env.APP_URL || `http://localhost:${port}`;
        return {
            ...item,
            imageUrl: item.imageUrl?.startsWith('http') ? item.imageUrl : (item.imageUrl ? `${appUrl}${item.imageUrl}` : null),
            videoUrl: item.videoUrl?.startsWith('http') ? item.videoUrl : (item.videoUrl ? `${appUrl}${item.videoUrl}` : null),
        };
    }
    async create(dto, siteId, files) {
        let imageUrl = dto.imageUrl;
        let videoUrl = dto.videoUrl;
        if (files?.imageFile?.[0]) {
            imageUrl = `/uploads/${files.imageFile[0].filename}`;
        }
        if (files?.videoFile?.[0]) {
            videoUrl = `/uploads/${files.videoFile[0].filename}`;
        }
        const published = dto.published === 'true' || dto.published === true;
        const tags = Array.isArray(dto.tags) ? dto.tags : (typeof dto.tags === 'string' && dto.tags ? dto.tags.split(',').map((t) => t.trim()) : []);
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
    async findAll(siteId) {
        const items = await this.prisma.galleryItem.findMany({
            where: { siteId },
            orderBy: { createdAt: 'desc' },
        });
        return items.map(i => this.formatGalleryUrl(i));
    }
    async findPublished(siteId) {
        const items = await this.prisma.galleryItem.findMany({
            where: { siteId, published: true },
            orderBy: { createdAt: 'desc' },
        });
        return items.map(i => this.formatGalleryUrl(i));
    }
    async findOne(id) {
        const item = await this.prisma.galleryItem.findUnique({ where: { id } });
        return this.formatGalleryUrl(item);
    }
    async update(id, dto, files) {
        const data = { ...dto };
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
            data.tags = Array.isArray(data.tags) ? data.tags : (typeof data.tags === 'string' && data.tags ? data.tags.split(',').map((t) => t.trim()) : []);
        }
        const updatedItem = await this.prisma.galleryItem.update({
            where: { id },
            data,
        });
        return this.formatGalleryUrl(updatedItem);
    }
    async remove(id) {
        const deletedItem = await this.prisma.galleryItem.delete({ where: { id } });
        return this.formatGalleryUrl(deletedItem);
    }
};
exports.GalleryService = GalleryService;
exports.GalleryService = GalleryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GalleryService);
//# sourceMappingURL=gallery.service.js.map