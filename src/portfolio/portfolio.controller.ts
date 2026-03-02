import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers, BadRequestException } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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
  create(@Headers('x-site-id') siteIdHeader: string, @Body() createPortfolioDto: CreatePortfolioDto) {
    return this.portfolioService.create(this.getSiteId(siteIdHeader), createPortfolioDto);
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
  update(@Param('id') id: string, @Headers('x-site-id') siteIdHeader: string, @Body() updatePortfolioDto: UpdatePortfolioDto) {
    return this.portfolioService.update(+id, this.getSiteId(siteIdHeader), updatePortfolioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Headers('x-site-id') siteIdHeader: string) {
    return this.portfolioService.remove(+id, this.getSiteId(siteIdHeader));
  }
}
