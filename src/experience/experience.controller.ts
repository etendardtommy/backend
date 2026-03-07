import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, BadRequestException } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) { }

  private getSiteId(siteIdHeader: string | undefined): number {
    if (!siteIdHeader) {
      throw new BadRequestException('Missing x-site-id header');
    }
    const siteId = parseInt(siteIdHeader, 10);
    if (isNaN(siteId)) {
      throw new BadRequestException('Invalid x-site-id header');
    }
    return siteId;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Headers('x-site-id') siteIdHeader: string | undefined,
    @Body() createExperienceDto: CreateExperienceDto,
  ) {
    return this.experienceService.create(this.getSiteId(siteIdHeader), createExperienceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllAdmin(@Headers('x-site-id') siteIdHeader: string | undefined) {
    return this.experienceService.findAll(this.getSiteId(siteIdHeader));
  }

  // Public route for the portfolio (no JWT required)
  @Get('public')
  findAllPublic(@Headers('x-site-id') siteIdHeader: string | undefined) {
    return this.experienceService.findAllPublic(this.getSiteId(siteIdHeader));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Headers('x-site-id') siteIdHeader: string | undefined,
    @Param('id') id: string,
  ) {
    return this.experienceService.findOne(+id, this.getSiteId(siteIdHeader));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Headers('x-site-id') siteIdHeader: string | undefined,
    @Param('id') id: string,
    @Body() updateExperienceDto: UpdateExperienceDto,
  ) {
    return this.experienceService.update(+id, this.getSiteId(siteIdHeader), updateExperienceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Headers('x-site-id') siteIdHeader: string | undefined,
    @Param('id') id: string,
  ) {
    return this.experienceService.remove(+id, this.getSiteId(siteIdHeader));
  }
}
