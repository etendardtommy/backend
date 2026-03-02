import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    htmlContent: string;

    @IsString()
    @IsOptional()
    excerpt?: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsBoolean()
    @IsOptional()
    published?: boolean;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @IsNumber()
    @IsNotEmpty()
    siteId: number;
}
