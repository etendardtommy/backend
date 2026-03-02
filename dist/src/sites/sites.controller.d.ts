import { SitesService } from './sites.service';
import { CreateSiteDto } from './dto/create-site.dto';
import { UpdateSiteDto } from './dto/update-site.dto';
export declare class SitesController {
    private readonly sitesService;
    constructor(sitesService: SitesService);
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__SiteClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        name: string;
        url: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateSiteDto: UpdateSiteDto): import(".prisma/client").Prisma.Prisma__SiteClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        name: string;
        url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__SiteClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        name: string;
        url: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
