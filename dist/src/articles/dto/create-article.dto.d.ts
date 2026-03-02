export declare class CreateArticleDto {
    title: string;
    htmlContent: string;
    excerpt?: string;
    imageUrl?: string;
    published?: boolean;
    tags?: string[];
    siteId: number;
}
