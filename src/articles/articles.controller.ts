import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
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

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'coverImage', maxCount: 1 },
    { name: 'htmlFile', maxCount: 1 },
  ], { storage: storageOptions }))
  create(
    @Body() createArticleDto: any, // Using any because FormData sends strings, we'll parse in service
    @UploadedFiles() files: { coverImage?: Express.Multer.File[], htmlFile?: Express.Multer.File[] }
  ) {
    return this.articlesService.create(createArticleDto, files);
  }

  // Permet de filtrer en passant ?siteId=1 par exemple
  @Get()
  findAll(@Query('siteId') siteId?: string) {
    return this.articlesService.findAll(siteId ? +siteId : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'coverImage', maxCount: 1 },
    { name: 'htmlFile', maxCount: 1 },
  ], { storage: storageOptions }))
  update(
    @Param('id') id: string,
    @Body() updateArticleDto: any,
    @UploadedFiles() files: { coverImage?: Express.Multer.File[], htmlFile?: Express.Multer.File[] }
  ) {
    return this.articlesService.update(+id, updateArticleDto, files);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
