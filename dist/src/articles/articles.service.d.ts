import { PrismaService } from '../prisma/prisma.service';
export declare class ArticlesService {
    private prisma;
    constructor(prisma: PrismaService);
    private formatArticleUrl;
    private processFiles;
    create(createArticleDto: any, files: {
        coverImage?: Express.Multer.File[];
    }): Promise<any>;
    findAll(siteId?: number): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateArticleDto: any, files: {
        coverImage?: Express.Multer.File[];
    }): Promise<any>;
    remove(id: number): Promise<any>;
    uploadImage(file: Express.Multer.File): {
        url: string;
    };
}
