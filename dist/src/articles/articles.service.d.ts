import { PrismaService } from '../prisma/prisma.service';
export declare class ArticlesService {
    private prisma;
    constructor(prisma: PrismaService);
    private processFiles;
    create(createArticleDto: any, files: {
        coverImage?: Express.Multer.File[];
        htmlFile?: Express.Multer.File[];
    }): Promise<{
        id: number;
        title: string;
        htmlContent: string;
        excerpt: string | null;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(siteId?: number): Promise<({
        site: {
            name: string;
        };
    } & {
        id: number;
        title: string;
        htmlContent: string;
        excerpt: string | null;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: number): Promise<{
        site: {
            name: string;
        };
    } & {
        id: number;
        title: string;
        htmlContent: string;
        excerpt: string | null;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, updateArticleDto: any, files: {
        coverImage?: Express.Multer.File[];
        htmlFile?: Express.Multer.File[];
    }): Promise<{
        id: number;
        title: string;
        htmlContent: string;
        excerpt: string | null;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        title: string;
        htmlContent: string;
        excerpt: string | null;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    uploadImage(file: Express.Multer.File): {
        url: string;
    };
}
