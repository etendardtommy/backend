import type { Request } from 'express';
import { GalleryService } from './gallery.service';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    findPublished(req: Request): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: any, files: {
        imageFile?: Express.Multer.File[];
        videoFile?: Express.Multer.File[];
    }, req: Request): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        id: number;
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(req: Request): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        id: number;
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: any, files: {
        imageFile?: Express.Multer.File[];
        videoFile?: Express.Multer.File[];
    }): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        id: number;
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        id: number;
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
