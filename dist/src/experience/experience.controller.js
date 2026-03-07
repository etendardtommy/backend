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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExperienceController = void 0;
const common_1 = require("@nestjs/common");
const experience_service_1 = require("./experience.service");
const create_experience_dto_1 = require("./dto/create-experience.dto");
const update_experience_dto_1 = require("./dto/update-experience.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ExperienceController = class ExperienceController {
    experienceService;
    constructor(experienceService) {
        this.experienceService = experienceService;
    }
    getSiteId(siteIdHeader) {
        if (!siteIdHeader) {
            throw new common_1.BadRequestException('Missing x-site-id header');
        }
        const siteId = parseInt(siteIdHeader, 10);
        if (isNaN(siteId)) {
            throw new common_1.BadRequestException('Invalid x-site-id header');
        }
        return siteId;
    }
    create(siteIdHeader, createExperienceDto) {
        return this.experienceService.create(this.getSiteId(siteIdHeader), createExperienceDto);
    }
    findAllAdmin(siteIdHeader) {
        return this.experienceService.findAll(this.getSiteId(siteIdHeader));
    }
    findAllPublic(siteIdHeader) {
        return this.experienceService.findAllPublic(this.getSiteId(siteIdHeader));
    }
    findOne(siteIdHeader, id) {
        return this.experienceService.findOne(+id, this.getSiteId(siteIdHeader));
    }
    update(siteIdHeader, id, updateExperienceDto) {
        return this.experienceService.update(+id, this.getSiteId(siteIdHeader), updateExperienceDto);
    }
    remove(siteIdHeader, id) {
        return this.experienceService.remove(+id, this.getSiteId(siteIdHeader));
    }
};
exports.ExperienceController = ExperienceController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('x-site-id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_experience_dto_1.CreateExperienceDto]),
    __metadata("design:returntype", void 0)
], ExperienceController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('x-site-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExperienceController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)('public'),
    __param(0, (0, common_1.Headers)('x-site-id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExperienceController.prototype, "findAllPublic", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Headers)('x-site-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ExperienceController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Headers)('x-site-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_experience_dto_1.UpdateExperienceDto]),
    __metadata("design:returntype", void 0)
], ExperienceController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Headers)('x-site-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ExperienceController.prototype, "remove", null);
exports.ExperienceController = ExperienceController = __decorate([
    (0, common_1.Controller)('experience'),
    __metadata("design:paramtypes", [experience_service_1.ExperienceService])
], ExperienceController);
//# sourceMappingURL=experience.controller.js.map