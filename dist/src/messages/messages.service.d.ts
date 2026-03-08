import { PrismaService } from '../prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesService {
    private prisma;
    private resend;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(createMessageDto: CreateMessageDto): Promise<{
        id: number;
        siteId: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        message: string;
        email: string;
        status: string;
    }>;
    private sendNotificationEmail;
    findAll(): Promise<({
        site: {
            name: string;
        } | null;
    } & {
        id: number;
        siteId: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        message: string;
        email: string;
        status: string;
    })[]>;
    findOne(id: number): Promise<({
        site: {
            name: string;
        } | null;
    } & {
        id: number;
        siteId: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        message: string;
        email: string;
        status: string;
    }) | null>;
    updateStatus(id: number, status: string): Promise<{
        id: number;
        siteId: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        message: string;
        email: string;
        status: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        siteId: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        message: string;
        email: string;
        status: string;
    }>;
}
