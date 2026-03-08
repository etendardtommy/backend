import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
    constructor(private prisma: PrismaService) { }

    async trackVisit(ipHash: string, path: string, siteId?: number) {
        // Vérifier si une visite avec le même ipHash et siteId existe déjà dans les 30 dernières minutes
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);

        const recentVisit = await this.prisma.pageView.findFirst({
            where: {
                ipHash,
                siteId,
                createdAt: {
                    gte: thirtyMinutesAgo,
                },
            },
        });

        // Si pas de visite récente, on l'enregistre
        if (!recentVisit) {
            return this.prisma.pageView.create({
                data: {
                    ipHash,
                    path,
                    siteId,
                },
            });
        }

        // Sinon on l'ignore silencieusement pour ne pas polluer la base
        return recentVisit;
    }

    async getVisitsCount(siteId?: number) {
        if (siteId) {
            return this.prisma.pageView.count({
                where: { siteId },
            });
        }
        return this.prisma.pageView.count();
    }
}
