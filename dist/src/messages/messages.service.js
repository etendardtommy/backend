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
var MessagesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const resend_1 = require("resend");
let MessagesService = MessagesService_1 = class MessagesService {
    prisma;
    resend;
    logger = new common_1.Logger(MessagesService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
        if (process.env.RESEND_API_KEY) {
            this.resend = new resend_1.Resend(process.env.RESEND_API_KEY);
        }
        else {
            this.logger.warn('RESEND_API_KEY is not defined. Email notifications will be disabled.');
        }
    }
    async create(createMessageDto) {
        const { name, email, message, siteId } = createMessageDto;
        const parsedSiteId = siteId ? parseInt(siteId, 10) : null;
        const savedMessage = await this.prisma.message.create({
            data: {
                name,
                email,
                message,
                siteId: parsedSiteId && !isNaN(parsedSiteId) ? parsedSiteId : null,
            },
        });
        this.sendNotificationEmail(savedMessage).catch((error) => {
            this.logger.error('Failed to send email notification', error);
        });
        return savedMessage;
    }
    async sendNotificationEmail(messageData) {
        if (!this.resend) {
            return;
        }
        const isEclyps = messageData.siteId === 2;
        const targetEmail = isEclyps ? process.env.ECLYPS_CONTACT_EMAIL : process.env.CONTACT_EMAIL;
        if (!targetEmail) {
            this.logger.warn(`Email not sent: Environment variable for ${isEclyps ? 'ECLYPS_CONTACT_EMAIL' : 'CONTACT_EMAIL'} is missing.`);
            return;
        }
        const subject = isEclyps
            ? `Demande de scrim de ${messageData.name} - Eclyps`
            : `Nouveau message de ${messageData.name} - Portfolio`;
        const htmlContent = isEclyps
            ? `<h2>Nouvelle demande de scrim (Eclyps)</h2>
               <p><strong>Équipe :</strong> ${messageData.name}</p>
               <p><strong>Email de contact :</strong> ${messageData.email}</p>
               <hr />
               <h3>Informations de la demande :</h3>
               <p>${messageData.message.replace(/\n/g, '<br />')}</p>`
            : `<h2>Nouveau message depuis le Portfolio</h2>
               <p><strong>De:</strong> ${messageData.name} (${messageData.email})</p>
               <hr />
               <h3>Message:</h3>
               <p>${messageData.message.replace(/\n/g, '<br />')}</p>`;
        await this.resend.emails.send({
            from: 'Portfolio / Eclyps Contact <onboarding@resend.dev>',
            to: targetEmail,
            subject: subject,
            html: htmlContent,
        });
    }
    async findAll() {
        return this.prisma.message.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                site: {
                    select: { name: true }
                }
            }
        });
    }
    async findOne(id) {
        return this.prisma.message.findUnique({
            where: { id },
            include: {
                site: {
                    select: { name: true }
                }
            }
        });
    }
    async updateStatus(id, status) {
        return this.prisma.message.update({
            where: { id },
            data: { status },
        });
    }
    async remove(id) {
        return this.prisma.message.delete({
            where: { id },
        });
    }
    async removeBulk(ids) {
        return this.prisma.message.deleteMany({
            where: {
                id: { in: ids },
            },
        });
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = MessagesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MessagesService);
//# sourceMappingURL=messages.service.js.map