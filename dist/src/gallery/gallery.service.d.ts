import { PrismaService } from '../prisma/prisma.service';
export declare class GalleryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any, siteId: number, files?: {
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
    findAll(siteId: number): import(".prisma/client").Prisma.PrismaPromise<{
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
    findPublished(siteId: number): import(".prisma/client").Prisma.PrismaPromise<{
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
    update(id: number, dto: any, files?: {
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
