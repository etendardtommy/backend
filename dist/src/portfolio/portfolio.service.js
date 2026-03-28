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
exports.PortfolioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PortfolioService = class PortfolioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    formatProjectUrl(project) {
        if (!project)
            return project;
        const port = process.env.PORT || 3000;
        const appUrl = process.env.APP_URL || `http://localhost:${port}`;
        return {
            ...project,
            imageUrl: project.imageUrl?.startsWith('http') ? project.imageUrl : (project.imageUrl ? `${appUrl}${project.imageUrl}` : null)
        };
    }
    processFiles(dto, coverImage) {
        const data = { ...dto };
        if (coverImage) {
            data.imageUrl = `/uploads/${coverImage.filename}`;
        }
        if (typeof data.technologies === 'string') {
            try {
                data.technologies = JSON.parse(data.technologies);
            }
            catch (e) {
                data.technologies = [];
            }
        }
        else if (!data.technologies) {
            data.technologies = [];
        }
        if (data.published !== undefined) {
            data.published = data.published === 'true' || data.published === true;
        }
        return data;
    }
    async create(siteId, createPortfolioDto, coverImage) {
        const data = this.processFiles(createPortfolioDto, coverImage);
        const project = await this.prisma.project.create({
            data: {
                ...data,
                siteId,
            },
        });
        return this.formatProjectUrl(project);
    }
    async findAll(siteId) {
        const projects = await this.prisma.project.findMany({
            where: { siteId },
            orderBy: { createdAt: 'desc' },
        });
        return projects.map(p => this.formatProjectUrl(p));
    }
    async findOne(id, siteId) {
        const project = await this.prisma.project.findFirst({
            where: { id, siteId },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Le projet avec l'ID ${id} n'a pas été trouvé`);
        }
        return this.formatProjectUrl(project);
    }
    async update(id, siteId, updatePortfolioDto, coverImage) {
        await this.findOne(id, siteId);
        const data = this.processFiles(updatePortfolioDto, coverImage);
        const updatedProject = await this.prisma.project.update({
            where: { id },
            data,
        });
        return this.formatProjectUrl(updatedProject);
    }
    async remove(id, siteId) {
        await this.findOne(id, siteId);
        const deletedProject = await this.prisma.project.delete({
            where: { id },
        });
        return this.formatProjectUrl(deletedProject);
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map