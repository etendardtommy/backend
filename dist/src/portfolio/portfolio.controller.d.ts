import { PortfolioService } from './portfolio.service';
export declare class PortfolioController {
    private readonly portfolioService;
    constructor(portfolioService: PortfolioService);
    private getSiteId;
    create(siteIdHeader: string, createPortfolioDto: any, coverImage?: Express.Multer.File): Promise<any>;
    findAll(siteIdHeader: string): Promise<any[]>;
    findOne(id: string, siteIdHeader: string): Promise<any>;
    update(id: string, siteIdHeader: string, updatePortfolioDto: any, coverImage?: Express.Multer.File): Promise<any>;
    remove(id: string, siteIdHeader: string): Promise<any>;
}
