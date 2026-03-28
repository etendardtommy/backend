"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ArticlesService = class ArticlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    formatArticleUrl(article) {
        if (!article)
            return article;
        const port = process.env.PORT || 3000;
        const appUrl = process.env.APP_URL || `http://localhost:${port}`;
        return {
            ...article,
            imageUrl: article.imageUrl?.startsWith('http') ? article.imageUrl : (article.imageUrl ? `${appUrl}${article.imageUrl}` : null)
        };
    }
    processFiles(data, files) {
        let finalData = { ...data };
        if (finalData.published !== undefined) {
            finalData.published = finalData.published === 'true';
        }
        if (finalData.siteId) {
            finalData.siteId = parseInt(finalData.siteId, 10);
        }
        if (finalData.tags && typeof finalData.tags === 'string') {
            try {
                finalData.tags = finalData.tags.includes('[')
                    ? JSON.parse(finalData.tags)
                    : finalData.tags.split(',').map((t) => t.trim());
            }
            catch {
                finalData.tags = [];
            }
        }
        if (files && files.coverImage && files.coverImage.length > 0) {
            finalData.imageUrl = `/uploads/${files.coverImage[0].filename}`;
        }
        return finalData;
    }
    async create(createArticleDto, files) {
        const processedData = this.processFiles(createArticleDto, files);
        const { siteId, ...articleData } = processedData;
        if (!siteId)
            throw new common_1.NotFoundException('siteId manquant');
        const site = await this.prisma.site.findUnique({ where: { id: siteId } });
        if (!site) {
            throw new common_1.NotFoundException(`Le site avec l'ID ${siteId} n'existe pas`);
        }
        const article = await this.prisma.article.create({
            data: {
                ...articleData,
                site: {
                    connect: { id: siteId }
                }
            },
            include: {
                site: {
                    select: { name: true }
                }
            }
        });
        return this.formatArticleUrl(article);
    }
    async findAll(siteId) {
        const whereClause = siteId ? { siteId } : {};
        const articles = await this.prisma.article.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            include: {
                site: {
                    select: { name: true }
                }
            }
        });
        return articles.map(a => this.formatArticleUrl(a));
    }
    async findOne(id) {
        const article = await this.prisma.article.findUnique({
            where: { id },
            include: {
                site: {
                    select: { name: true }
                }
            }
        });
        if (!article) {
            throw new common_1.NotFoundException(`Article avec l'ID ${id} non trouvé`);
        }
        return this.formatArticleUrl(article);
    }
    async update(id, updateArticleDto, files) {
        await this.findOne(id);
        const processedData = this.processFiles(updateArticleDto, files);
        const { siteId, ...articleData } = processedData;
        const updatedArticle = await this.prisma.article.update({
            where: { id },
            data: articleData,
            include: {
                site: {
                    select: { name: true }
                }
            }
        });
        return this.formatArticleUrl(updatedArticle);
    }
    async remove(id) {
        await this.findOne(id);
        const deletedArticle = await this.prisma.article.delete({
            where: { id },
            include: {
                site: {
                    select: { name: true }
                }
            }
        });
        return this.formatArticleUrl(deletedArticle);
    }
    uploadImage(file) {
        if (!file) {
            throw new Error('Aucun fichier fourni');
        }
        const port = process.env.PORT || 3000;
        const appUrl = process.env.APP_URL || `http://localhost:${port}`;
        return { url: `${appUrl}/uploads/${file.filename}` };
    }
};
exports.ArticlesService = ArticlesService;
exports.ArticlesService = ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ArticlesService);
//# sourceMappingURL=articles.service.js.map