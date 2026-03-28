import { PrismaService } from '../prisma/prisma.service';
export declare class GalleryService {
    private prisma;
    constructor(prisma: PrismaService);
    private formatGalleryUrl;
    create(dto: any, siteId: number, files?: {
        imageFile?: Express.Multer.File[];
        videoFile?: Express.Multer.File[];
    }): Promise<any>;
    findAll(siteId: number): Promise<any[]>;
    findPublished(siteId: number): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: any, files?: {
        imageFile?: Express.Multer.File[];
        videoFile?: Express.Multer.File[];
    }): Promise<any>;
    remove(id: number): Promise<any>;
}
