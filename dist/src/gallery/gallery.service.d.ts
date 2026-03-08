import { PrismaService } from '../prisma/prisma.service';
export declare class GalleryService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: any, siteId: number, files?: {
        imageFile?: Express.Multer.File[];
        videoFile?: Express.Multer.File[];
    }): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(siteId: number): import(".prisma/client").Prisma.PrismaPromise<{
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number;
    }[]>;
    findPublished(siteId: number): import(".prisma/client").Prisma.PrismaPromise<{
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: any, files?: {
        imageFile?: Express.Multer.File[];
        videoFile?: Express.Multer.File[];
    }): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__GalleryItemClient<{
        type: string;
        title: string;
        description: string | null;
        imageUrl: string | null;
        videoUrl: string | null;
        category: string | null;
        tags: string[];
        published: boolean;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
