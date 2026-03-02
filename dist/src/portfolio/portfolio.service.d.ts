import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PortfolioService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(siteId: number, createPortfolioDto: CreatePortfolioDto): Promise<{
        id: number;
        title: string;
        imageUrl: string | null;
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
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        githubUrl: string | null;
        liveUrl: string | null;
        technologies: string[];
    }>;
    update(id: number, siteId: number, updatePortfolioDto: UpdatePortfolioDto): Promise<{
        id: number;
        title: string;
        imageUrl: string | null;
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
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        githubUrl: string | null;
        liveUrl: string | null;
        technologies: string[];
    }>;
}
