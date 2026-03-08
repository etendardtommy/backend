import { PrismaService } from '../prisma/prisma.service';
export declare class RosterService {
    private prisma;
    constructor(prisma: PrismaService);
    private processFile;
    create(siteId: number, createDto: any, photoFile?: Express.Multer.File): Promise<{
        number: string | null;
        id: number;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        photoUrl: string | null;
    }>;
    findAll(siteId: number): Promise<{
        number: string | null;
        id: number;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        photoUrl: string | null;
    }[]>;
    findOne(id: number, siteId: number): Promise<{
        number: string | null;
        id: number;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        photoUrl: string | null;
    }>;
    update(id: number, siteId: number, updateDto: any, photoFile?: Express.Multer.File): Promise<{
        number: string | null;
        id: number;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        photoUrl: string | null;
    }>;
    remove(id: number, siteId: number): Promise<{
        number: string | null;
        id: number;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        photoUrl: string | null;
    }>;
}
