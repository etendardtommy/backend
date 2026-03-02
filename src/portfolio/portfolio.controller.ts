import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, BadRequestException, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { diskStorage } from 'multer';
import * as path from 'path';

const storageOptions = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

@Controller('portfolio/projects')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) { }

  private getSiteId(siteIdHeader: string): number {
    if (!siteIdHeader) {
      throw new BadRequestException('L\'en-tête x-site-id est requis');
    }
    const siteId = parseInt(siteIdHeader, 10);
    if (isNaN(siteId)) {
      throw new BadRequestException('L\'en-tête x-site-id doit être un nombre valide');
    }
    return siteId;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('coverImage', { storage: storageOptions }))
  create(
    @Headers('x-site-id') siteIdHeader: string,
    @Body() createPortfolioDto: any, // any used since FormData sends strings
    @UploadedFile() coverImage?: Express.Multer.File
  ) {
    return this.portfolioService.create(this.getSiteId(siteIdHeader), createPortfolioDto, coverImage);
  }

  @Get()
  findAll(@Headers('x-site-id') siteIdHeader: string) {
    return this.portfolioService.findAll(this.getSiteId(siteIdHeader));
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers('x-site-id') siteIdHeader: string) {
    return this.portfolioService.findOne(+id, this.getSiteId(siteIdHeader));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('coverImage', { storage: storageOptions }))
  update(
    @Param('id') id: string,
    @Headers('x-site-id') siteIdHeader: string,
    @Body() updatePortfolioDto: any,
    @UploadedFile() coverImage?: Express.Multer.File
  ) {
    return this.portfolioService.update(+id, this.getSiteId(siteIdHeader), updatePortfolioDto, coverImage);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Headers('x-site-id') siteIdHeader: string) {
    return this.portfolioService.remove(+id, this.getSiteId(siteIdHeader));
  }
}
