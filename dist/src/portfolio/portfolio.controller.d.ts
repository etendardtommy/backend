import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    private getSiteId;
    create(siteIdHeader: string, createPortfolioDto: CreatePortfolioDto): Promise<{
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
    findAll(siteIdHeader: string): Promise<{
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
    findOne(id: string, siteIdHeader: string): Promise<{
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
    update(id: string, siteIdHeader: string, updatePortfolioDto: UpdatePortfolioDto): Promise<{
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
    remove(id: string, siteIdHeader: string): Promise<{
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
