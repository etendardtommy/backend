import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class SitesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createSiteDto: CreateSiteDto): import(".prisma/client").Prisma.Prisma__SiteClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        name: string;
        url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        name: string;
        url: string | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__SiteClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        name: string;
        url: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, updateSiteDto: UpdateSiteDto): import(".prisma/client").Prisma.Prisma__SiteClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        name: string;
        url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__SiteClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        name: string;
        url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
