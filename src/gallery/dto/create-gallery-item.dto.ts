import { IsString, IsOptional, IsBoolean, IsArray, IsNumber } from 'class-validator';

export class CreateGalleryItemDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    type?: string; // 'photo' or 'video'

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsString()
    @IsOptional()
    videoUrl?: string;

    @IsString()
    @IsOptional()
    category?: string;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    tags?: string[];

    @IsBoolean()
    @IsOptional()
    published?: boolean;

    @IsNumber()
    @IsOptional()
    siteId?: number;
}
