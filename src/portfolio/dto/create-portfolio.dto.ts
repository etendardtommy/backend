import { IsNotEmpty, IsOptional, IsString, IsUrl, ValidateIf, IsBooleanString } from 'class-validator';

export class CreatePortfolioDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @ValidateIf(o => o.imageUrl !== '')
    imageUrl?: string;

    @IsOptional()
    @ValidateIf(o => o.githubUrl !== '')
    @IsUrl({}, { message: 'Le lien GitHub doit être une adresse web valide' })
    githubUrl?: string;

    @IsOptional()
    @ValidateIf(o => o.liveUrl !== '')
    @IsUrl({}, { message: 'Le lien live doit être une adresse web valide' })
    liveUrl?: string;

    @IsOptional()
    @IsString()
    technologies?: string;

    @IsOptional()
    @IsBooleanString()
    published?: string;
}
