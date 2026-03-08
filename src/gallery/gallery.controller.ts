import {
    Controller, Get, Post, Body, Patch, Param, Delete,
    UseGuards, ParseIntPipe, Req, UseInterceptors, UploadedFiles
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import type { Request } from 'express';
import { GalleryService } from './gallery.service';
import { CreateGalleryItemDto } from './dto/create-gallery-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const storageOptions = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

@Controller('gallery')
export class GalleryController {
    constructor(private readonly galleryService: GalleryService) { }

    // Public endpoint: Get published items for a site
    @Get('public')
    findPublished(@Req() req: Request) {
        const siteId = parseInt(req.headers['x-site-id'] as string) || 1;
        return this.galleryService.findPublished(siteId);
    }

    // Admin endpoints
    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'imageFile', maxCount: 1 },
        { name: 'videoFile', maxCount: 1 },
    ], { storage: storageOptions }))
    create(
        @Body() dto: any,
        @UploadedFiles() files: { imageFile?: Express.Multer.File[], videoFile?: Express.Multer.File[] },
        @Req() req: Request
    ) {
        const siteId = parseInt(req.headers['x-site-id'] as string) || 1;
        return this.galleryService.create(dto, siteId, files);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Req() req: Request) {
        const siteId = parseInt(req.headers['x-site-id'] as string) || 1;
        return this.galleryService.findAll(siteId);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.galleryService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'imageFile', maxCount: 1 },
        { name: 'videoFile', maxCount: 1 },
    ], { storage: storageOptions }))
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: any,
        @UploadedFiles() files: { imageFile?: Express.Multer.File[], videoFile?: Express.Multer.File[] }
    ) {
        return this.galleryService.update(id, dto, files);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.galleryService.remove(id);
    }
}
