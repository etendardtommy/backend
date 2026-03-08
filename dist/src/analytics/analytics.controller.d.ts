import { AnalyticsService } from './analytics.service';
import type { Request } from 'express';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    trackVisit(req: Request, siteIdHeader?: string): Promise<{
        id: number;
        siteId: number | null;
        createdAt: Date;
        ipHash: string;
        path: string | null;
    }>;
    getStats(siteIdQuery?: string): Promise<{
        visits: number;
    }>;
}
