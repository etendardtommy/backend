import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { SitesModule } from './sites/sites.module';
import { ArticlesModule } from './articles/articles.module';
import { ExperienceModule } from './experience/experience.module';
import { MessagesModule } from './messages/messages.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { GalleryModule } from './gallery/gallery.module';
import { RosterModule } from './roster/roster.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, UsersModule, AuthModule, PortfolioModule, SitesModule, ArticlesModule, ExperienceModule, MessagesModule, AnalyticsModule, GalleryModule, RosterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
