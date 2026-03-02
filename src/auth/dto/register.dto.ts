import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @IsString({ message: 'Le nom d\'utilisateur doit être une chaîne' })
    @IsNotEmpty({ message: 'Le nom d\'utilisateur est requis' })
    username: string;

    @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
    @IsNotEmpty({ message: 'Le mot de passe est requis' })
    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
    password: string;

    @IsString()
    @IsOptional()
    name?: string;
}
