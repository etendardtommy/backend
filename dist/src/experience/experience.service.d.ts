import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class ExperienceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(siteId: number, createExperienceDto: CreateExperienceDto): Promise<{
        id: number;
        title: string;
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: string;
        date: string;
        subtitle: string;
        skills: string | null;
    }>;
    findAll(siteId: number): Promise<{
        id: number;
        title: string;
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: string;
        date: string;
        subtitle: string;
        skills: string | null;
    }[]>;
    findAllPublic(siteId: number): Promise<{
        id: number;
        title: string;
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: string;
        date: string;
        subtitle: string;
        skills: string | null;
    }[]>;
    findOne(id: number, siteId: number): Promise<{
        id: number;
        title: string;
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: string;
        date: string;
        subtitle: string;
        skills: string | null;
    }>;
    update(id: number, siteId: number, updateExperienceDto: UpdateExperienceDto): Promise<{
        id: number;
        title: string;
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: string;
        date: string;
        subtitle: string;
        skills: string | null;
    }>;
    remove(id: number, siteId: number): Promise<{
        id: number;
        title: string;
        published: boolean;
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        type: string;
        date: string;
        subtitle: string;
        skills: string | null;
    }>;
}
