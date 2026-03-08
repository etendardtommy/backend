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
exports.RosterService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RosterService = class RosterService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    processFile(dto, photoFile) {
        const port = process.env.PORT || 3000;
        const appUrl = process.env.APP_URL || `http://localhost:${port}`;
        const data = { ...dto };
        if (photoFile) {
            data.photoUrl = `${appUrl}/uploads/${photoFile.filename}`;
        }
        return data;
    }
    async create(siteId, createDto, photoFile) {
        const data = this.processFile(createDto, photoFile);
        return this.prisma.rosterItem.create({
            data: {
                name: data.name,
                number: data.number || null,
                photoUrl: data.photoUrl || null,
                siteId,
            },
        });
    }
    async findAll(siteId) {
        return this.prisma.rosterItem.findMany({
            where: { siteId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, siteId) {
        const item = await this.prisma.rosterItem.findFirst({
            where: { id, siteId },
        });
        if (!item) {
            throw new common_1.NotFoundException(`Le joueur avec l'ID ${id} n'a pas été trouvé`);
        }
        return item;
    }
    async update(id, siteId, updateDto, photoFile) {
        await this.findOne(id, siteId);
        const data = this.processFile(updateDto, photoFile);
        return this.prisma.rosterItem.update({
            where: { id },
            data: {
                name: data.name,
                number: data.number,
                photoUrl: data.photoUrl,
            },
        });
    }
    async remove(id, siteId) {
        await this.findOne(id, siteId);
        return this.prisma.rosterItem.delete({
            where: { id },
        });
    }
};
exports.RosterService = RosterService;
exports.RosterService = RosterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RosterService);
//# sourceMappingURL=roster.service.js.map