import { ArticlesService } from './articles.service';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    uploadImage(file: Express.Multer.File): {
        url: string;
    };
    create(createArticleDto: any, files: {
        coverImage?: Express.Multer.File[];
    }): Promise<any>;
    findAll(siteId?: string): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateArticleDto: any, files: {
        coverImage?: Express.Multer.File[];
    }): Promise<any>;
    remove(id: string): Promise<any>;
}
