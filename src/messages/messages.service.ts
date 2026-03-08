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
        if (!this.resend || !process.env.CONTACT_EMAIL) {
            return;
        }

        await this.resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Default resend testing domain, change to verified domain later
            to: process.env.CONTACT_EMAIL,
            subject: `Nouveau message de ${messageData.name} - Portfolio`,
            html: `
        <h2>Nouveau message depuis le Portfolio</h2>
        <p><strong>De:</strong> ${messageData.name} (${messageData.email})</p>
        <p><strong>Site ID:</strong> ${messageData.siteId || 'N/A'}</p>
        <hr />
        <h3>Message:</h3>
        <p>${messageData.message.replace(/\n/g, '<br />')}</p>
      `,
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
}
