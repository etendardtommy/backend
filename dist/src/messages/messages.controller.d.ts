import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto, siteId?: string): Promise<{
        id: number;
        siteId: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        message: string;
        email: string;
        status: string;
    }>;
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
    findOne(id: string): Promise<({
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
    updateStatus(id: string, status: string): Promise<{
        id: number;
        siteId: number | null;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        message: string;
        email: string;
        status: string;
    }>;
    remove(id: string): Promise<{
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
