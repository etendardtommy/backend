import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) { }

    @Post()
    create(
        @Body() createMessageDto: CreateMessageDto,
        @Headers('x-site-id') siteId?: string,
    ) {
        // If siteId is passed in headers, attach it to the DTO
        if (siteId && !createMessageDto.siteId) {
            createMessageDto.siteId = siteId;
        }
        return this.messagesService.create(createMessageDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
        return this.messagesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.messagesService.findOne(+id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/status')
    updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.messagesService.updateStatus(+id, status);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.messagesService.remove(+id);
    }
}
