import { PrismaService } from '../prisma/prisma.service';
export declare class PortfolioService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private processFiles;
    create(siteId: number, createPortfolioDto: any, coverImage?: Express.Multer.File): Promise<{
        id: number;
        title: string;
        imageUrl: string | null;
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        githubUrl: string | null;
        liveUrl: string | null;
        technologies: string[];
    }>;
    findAll(siteId: number): Promise<{
        id: number;
        title: string;
        imageUrl: string | null;
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        githubUrl: string | null;
        liveUrl: string | null;
        technologies: string[];
    }[]>;
    findOne(id: number, siteId: number): Promise<{
        id: number;
        title: string;
        imageUrl: string | null;
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        githubUrl: string | null;
        liveUrl: string | null;
        technologies: string[];
    }>;
    update(id: number, siteId: number, updatePortfolioDto: any, coverImage?: Express.Multer.File): Promise<{
        id: number;
        title: string;
        imageUrl: string | null;
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        githubUrl: string | null;
        liveUrl: string | null;
        technologies: string[];
    }>;
    remove(id: number, siteId: number): Promise<{
        id: number;
        title: string;
        imageUrl: string | null;
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        githubUrl: string | null;
        liveUrl: string | null;
        technologies: string[];
    }>;
}
