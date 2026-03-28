import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, siteId?: string): Promise<{
        name: string;
        email: string;
        message: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number | null;
    }>;
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
    findOne(id: string): Promise<({
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
    updateStatus(id: string, status: string): Promise<{
        name: string;
        email: string;
        message: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        siteId: number | null;
    }>;
    remove(id: string): Promise<{
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
