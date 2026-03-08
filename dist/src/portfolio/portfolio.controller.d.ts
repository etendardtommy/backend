import { PortfolioService } from './portfolio.service';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    private getSiteId;
    create(siteIdHeader: string, createPortfolioDto: any, coverImage?: Express.Multer.File): Promise<{
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
    findAll(siteIdHeader: string): Promise<{
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
    findOne(id: string, siteIdHeader: string): Promise<{
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
    update(id: string, siteIdHeader: string, updatePortfolioDto: any, coverImage?: Express.Multer.File): Promise<{
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
    remove(id: string, siteIdHeader: string): Promise<{
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
