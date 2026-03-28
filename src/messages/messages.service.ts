import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Resend } from 'resend';

@Injectable()
export class MessagesService {
    private resend: Resend;
    private readonly logger = new Logger(MessagesService.name);

    constructor(private prisma: PrismaService) {
        // Only initialize Resend if the API key is provided
        if (process.env.RESEND_API_KEY) {
            this.resend = new Resend(process.env.RESEND_API_KEY);
        } else {
            this.logger.warn('RESEND_API_KEY is not defined. Email notifications will be disabled.');
        }
    }

    async create(createMessageDto: CreateMessageDto) {
        const { name, email, message, siteId } = createMessageDto;

        // Convert siteId to number if present
        const parsedSiteId = siteId ? parseInt(siteId, 10) : null;

        // Save message to database
        const savedMessage = await this.prisma.message.create({
            data: {
                name,
                email,
                message,
                siteId: parsedSiteId && !isNaN(parsedSiteId) ? parsedSiteId : null,
            },
        });

        // Send email notification asynchronously
        this.sendNotificationEmail(savedMessage).catch((error) => {
            this.logger.error('Failed to send email notification', error);
        });

        return savedMessage;
    }

    private async sendNotificationEmail(messageData: any) {
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
            from: 'Portfolio / Eclyps Contact <onboarding@resend.dev>', // Default resend testing domain, change to verified domain later
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

    async findOne(id: number) {
        return this.prisma.message.findUnique({
            where: { id },
            include: {
                site: {
                    select: { name: true }
                }
            }
        });
    }

    async updateStatus(id: number, status: string) {
        return this.prisma.message.update({
            where: { id },
            data: { status },
        });
    }

    async remove(id: number) {
        return this.prisma.message.delete({
            where: { id },
        });
    }

    async removeBulk(ids: number[]) {
        return this.prisma.message.deleteMany({
            where: {
                id: { in: ids },
            },
        });
    }
}
