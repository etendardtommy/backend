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
    async create(siteId, createPortfolioDto) {
        return this.prisma.project.create({
            data: {
                ...createPortfolioDto,
                technologies: createPortfolioDto.technologies || [],
                siteId,
            },
        });
    }
    async findAll(siteId) {
        return this.prisma.project.findMany({
            where: { siteId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, siteId) {
        const project = await this.prisma.project.findFirst({
            where: { id, siteId },
        });
        if (!project) {
            throw new common_1.NotFoundException(`Le projet avec l'ID ${id} n'a pas été trouvé`);
        }
        return project;
    }
    async update(id, siteId, updatePortfolioDto) {
        await this.findOne(id, siteId);
        return this.prisma.project.update({
            where: { id },
            data: updatePortfolioDto,
        });
    }
    async remove(id, siteId) {
        await this.findOne(id, siteId);
        return this.prisma.project.delete({
            where: { id },
        });
    }
};
exports.PortfolioService = PortfolioService;
exports.PortfolioService = PortfolioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PortfolioService);
//# sourceMappingURL=portfolio.service.js.map