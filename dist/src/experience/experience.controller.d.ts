import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
export declare class ExperienceController {
    private readonly experienceService;
    constructor(experienceService: ExperienceService);
    private getSiteId;
    create(siteIdHeader: string | undefined, createExperienceDto: CreateExperienceDto): Promise<{
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
    findAllAdmin(siteIdHeader: string | undefined): Promise<{
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
    findAllPublic(siteIdHeader: string | undefined): Promise<{
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
    findOne(siteIdHeader: string | undefined, id: string): Promise<{
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
    update(siteIdHeader: string | undefined, id: string, updateExperienceDto: UpdateExperienceDto): Promise<{
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
    remove(siteIdHeader: string | undefined, id: string): Promise<{
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
