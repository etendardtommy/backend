import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateExperienceDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    subtitle: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    skills?: string;

    @IsBoolean()
    @IsOptional()
    published?: boolean;
}
