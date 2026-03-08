import { Controller, Get, Post, Headers, Req, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import type { Request } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as crypto from 'crypto';

@Controller('analytics')
export class AnalyticsController {
    constructor(private readonly analyticsService: AnalyticsService) { }

    @Post('visit')
    async trackVisit(
        @Req() req: Request,
        @Headers('x-site-id') siteIdHeader?: string,
    ) {
        // Hasher l'IP pour la confidentialité (RGPD) tout en permettant de limiter les visites uniques
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
        const ipStr = Array.isArray(ip) ? ip[0] : ip;
        const ipHash = crypto.createHash('sha256').update(ipStr).digest('hex');

        const siteId = siteIdHeader ? parseInt(siteIdHeader, 10) : undefined;
        const path = req.body?.path || '/';

        const validSiteId = siteId !== undefined && !isNaN(siteId) ? siteId : undefined;
        return this.analyticsService.trackVisit(ipHash, path, validSiteId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('stats')
    async getStats(@Query('siteId') siteIdQuery?: string) {
        const siteId = siteIdQuery ? parseInt(siteIdQuery, 10) : undefined;
        const validSiteId = siteId !== undefined && !isNaN(siteId) ? siteId : undefined;
        const visits = await this.analyticsService.getVisitsCount(validSiteId);

        return { visits };
    }
}
