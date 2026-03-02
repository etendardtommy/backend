import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async register(registerDto: RegisterDto) {
        const { username, password, name } = registerDto;

        // Vérifier si l'utilisateur existe déjà
        const userExists = await this.usersService.findOneByUsername(username);
        if (userExists) {
            throw new ConflictException('Ce nom d\'utilisateur est déjà utilisé');
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer l'utilisateur
        const user = await this.usersService.create({
            username,
            name,
            password: hashedPassword,
        });

        // Optionnel : ne pas renvoyer le mot de passe dans la réponse
        const { password: _, ...result } = user;
        return result;
    }

    async login(loginDto: LoginDto) {
        const { username, password } = loginDto;

        // Trouver l'utilisateur
        const user = await this.usersService.findOneByUsername(username);
        if (!user) {
            throw new UnauthorizedException('Identifiants invalides');
        }

        // Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Identifiants invalides');
        }

        // Générer le token JWT
        const payload = { username: user.username, sub: user.id, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
