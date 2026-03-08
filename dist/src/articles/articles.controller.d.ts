import { ArticlesService } from './articles.service';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    uploadImage(file: Express.Multer.File): {
        url: string;
    };
    create(createArticleDto: any, files: {
        coverImage?: Express.Multer.File[];
    }): Promise<{
        id: number;
        title: string;
        htmlContent: string;
        excerpt: string | null;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(siteId?: string): Promise<({
        site: {
            name: string;
        };
    } & {
        id: number;
        title: string;
        htmlContent: string;
        excerpt: string | null;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        site: {
            name: string;
        };
    } & {
        id: number;
        title: string;
        htmlContent: string;
        excerpt: string | null;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateArticleDto: any, files: {
        coverImage?: Express.Multer.File[];
    }): Promise<{
        id: number;
        title: string;
        htmlContent: string;
        excerpt: string | null;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        htmlContent: string;
        excerpt: string | null;
        imageUrl: string | null;
        published: boolean;
        tags: string[];
        siteId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
