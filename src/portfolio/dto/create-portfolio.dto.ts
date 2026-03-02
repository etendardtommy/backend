import { IsNotEmpty, IsOptional, IsString, IsArray, IsUrl, ValidateIf } from 'class-validator';

export class CreatePortfolioDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @ValidateIf(o => o.imageUrl !== '')
    @IsUrl({}, { message: 'L\'URL de l\'image doit être une adresse web valide' })
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
    @IsArray()
    @IsString({ each: true })
    technologies?: string[];
}
