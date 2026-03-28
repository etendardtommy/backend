import { PrismaService } from '../prisma/prisma.service';
export declare class PortfolioService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private formatProjectUrl;
    private processFiles;
    create(siteId: number, createPortfolioDto: any, coverImage?: Express.Multer.File): Promise<any>;
    findAll(siteId: number): Promise<any[]>;
    findOne(id: number, siteId: number): Promise<any>;
    update(id: number, siteId: number, updatePortfolioDto: any, coverImage?: Express.Multer.File): Promise<any>;
    remove(id: number, siteId: number): Promise<any>;
}
