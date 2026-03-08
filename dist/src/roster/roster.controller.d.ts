import { RosterService } from './roster.service';
export declare class RosterController {
    private readonly rosterService;
    constructor(rosterService: RosterService);
    private getSiteId;
    findPublic(siteIdHeader: string): Promise<{
        number: string | null;
        id: number;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        photoUrl: string | null;
    }[]>;
    create(siteIdHeader: string, createDto: any, photoFile?: Express.Multer.File): Promise<{
        number: string | null;
        id: number;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        photoUrl: string | null;
    }>;
    findAll(siteIdHeader: string): Promise<{
        number: string | null;
        id: number;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        photoUrl: string | null;
    }[]>;
    findOne(id: string, siteIdHeader: string): Promise<{
        number: string | null;
        id: number;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        photoUrl: string | null;
    }>;
    update(id: string, siteIdHeader: string, updateDto: any, photoFile?: Express.Multer.File): Promise<{
        number: string | null;
        id: number;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        photoUrl: string | null;
    }>;
    remove(id: string, siteIdHeader: string): Promise<{
        number: string | null;
        id: number;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        photoUrl: string | null;
    }>;
}
