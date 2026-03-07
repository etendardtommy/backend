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
exports.ExperienceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ExperienceService = class ExperienceService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(siteId, createExperienceDto) {
        return this.prisma.experience.create({
            data: {
                ...createExperienceDto,
                siteId,
            },
        });
    }
    async findAll(siteId) {
        return this.prisma.experience.findMany({
            where: { siteId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findAllPublic(siteId) {
        return this.prisma.experience.findMany({
            where: { siteId, published: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, siteId) {
        const experience = await this.prisma.experience.findFirst({
            where: { id, siteId },
        });
        if (!experience) {
            throw new common_1.NotFoundException(`Experience with ID ${id} not found for this site`);
        }
        return experience;
    }
    async update(id, siteId, updateExperienceDto) {
        await this.findOne(id, siteId);
        return this.prisma.experience.update({
            where: { id },
            data: updateExperienceDto,
        });
    }
    async remove(id, siteId) {
        await this.findOne(id, siteId);
        return this.prisma.experience.delete({
            where: { id },
        });
    }
};
exports.ExperienceService = ExperienceService;
exports.ExperienceService = ExperienceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ExperienceService);
//# sourceMappingURL=experience.service.js.map