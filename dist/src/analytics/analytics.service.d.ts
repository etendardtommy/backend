import { PrismaService } from '../prisma/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    trackVisit(ipHash: string, path: string, siteId?: number): Promise<{
        id: number;
        siteId: number | null;
        createdAt: Date;
        ipHash: string;
        path: string | null;
    }>;
    getVisitsCount(siteId?: number): Promise<number>;
}
