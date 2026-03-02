import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsString({ message: 'Le nom d\'utilisateur doit être une chaîne' })
    @IsNotEmpty({ message: 'Le nom d\'utilisateur est requis' })
    username: string;

    @IsString({ message: 'Le mot de passe doit être une chaîne de caractères' })
    @IsNotEmpty({ message: 'Le mot de passe est requis' })
    password: string;
}
