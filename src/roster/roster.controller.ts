import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { RosterService } from './roster.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

const storageOptions = diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

@Controller('roster')
export class RosterController {
    constructor(private readonly rosterService: RosterService) { }

    private getSiteId(siteIdHeader: string): number {
        if (!siteIdHeader) throw new BadRequestException("L'en - tête x - site - id est requis");
        const siteId = parseInt(siteIdHeader, 10);
        if (isNaN(siteId)) throw new BadRequestException("L'en - tête x - site - id doit être un nombre valide");
        return siteId;
    }

    // Public endpoint for Eclipse Web
    @Get('public')
    findPublic(@Headers('x-site-id') siteIdHeader: string) {
        return this.rosterService.findAll(this.getSiteId(siteIdHeader));
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UseInterceptors(FileInterceptor('photoFile', { storage: storageOptions }))
    create(
        @Headers('x-site-id') siteIdHeader: string,
        @Body() createDto: any,
        @UploadedFile() photoFile?: Express.Multer.File
    ) {
        return this.rosterService.create(this.getSiteId(siteIdHeader), createDto, photoFile);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    findAll(@Headers('x-site-id') siteIdHeader: string) {
        return this.rosterService.findAll(this.getSiteId(siteIdHeader));
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string, @Headers('x-site-id') siteIdHeader: string) {
        return this.rosterService.findOne(+id, this.getSiteId(siteIdHeader));
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    @UseInterceptors(FileInterceptor('photoFile', { storage: storageOptions }))
    update(
        @Param('id') id: string,
        @Headers('x-site-id') siteIdHeader: string,
        @Body() updateDto: any,
        @UploadedFile() photoFile?: Express.Multer.File
    ) {
        return this.rosterService.update(+id, this.getSiteId(siteIdHeader), updateDto, photoFile);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @Headers('x-site-id') siteIdHeader: string) {
        return this.rosterService.remove(+id, this.getSiteId(siteIdHeader));
    }
}
