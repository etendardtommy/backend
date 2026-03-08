import type { Request } from 'express';
import { GalleryService } from './gallery.service';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    findPublished(req: Request): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        title: string;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: string;
        videoUrl: string | null;
        category: string | null;
    }[]>;
    create(dto: any, files: {
        imageFile?: Express.Multer.File[];
        videoFile?: Express.Multer.File[];
    }, req: Request): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        id: number;
        title: string;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: string;
        videoUrl: string | null;
        category: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(req: Request): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        title: string;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: string;
        videoUrl: string | null;
        category: string | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        id: number;
        title: string;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: string;
        videoUrl: string | null;
        category: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: any, files: {
        imageFile?: Express.Multer.File[];
        videoFile?: Express.Multer.File[];
    }): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        id: number;
        title: string;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: string;
        videoUrl: string | null;
        category: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        id: number;
        title: string;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        type: string;
        videoUrl: string | null;
        category: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
