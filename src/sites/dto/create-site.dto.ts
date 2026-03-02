import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSiteDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    url?: string;
}
