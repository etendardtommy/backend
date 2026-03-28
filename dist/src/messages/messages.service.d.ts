import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesService {
    private prisma;
    private resend;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createMessageDto: CreateMessageDto): Promise<{
        name: string;
        email: string;
        message: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number | null;
    }>;
    private sendNotificationEmail;
    findAll(): Promise<({
        site: {
            name: string;
        } | null;
    } & {
        name: string;
        email: string;
        message: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number | null;
    })[]>;
    findOne(id: number): Promise<({
        site: {
            name: string;
        } | null;
    } & {
        name: string;
        email: string;
        message: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number | null;
    }) | null>;
    updateStatus(id: number, status: string): Promise<{
        name: string;
        email: string;
        message: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number | null;
    }>;
    remove(id: number): Promise<{
        name: string;
        email: string;
        message: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number | null;
    }>;
    removeBulk(ids: number[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
