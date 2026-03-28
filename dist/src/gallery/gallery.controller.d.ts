import type { Request } from 'express';
import { GalleryService } from './gallery.service';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    findPublished(req: Request): Promise<any[]>;
    create(dto: any, files: {
        imageFile?: Express.Multer.File[];
        videoFile?: Express.Multer.File[];
    }, req: Request): Promise<any>;
    findAll(req: Request): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: any, files: {
        imageFile?: Express.Multer.File[];
        videoFile?: Express.Multer.File[];
    }): Promise<any>;
    remove(id: number): Promise<any>;
}
