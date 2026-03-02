import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { AuthService } from './src/auth/auth.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const authService = app.get(AuthService);

    try {
        const user = await authService.register({
            username: 'admin',
            password: 'adminPassword123!',
            name: 'Super Admin',
        });
        console.log('Utilisateur admin créé avec succès!', user.username);
    } catch (err: any) {
        if (err.status === 409) {
            console.log('L\'utilisateur admin existe déjà.');
        } else {
            console.error('Erreur lors de la création de l\'admin:', err);
        }
    } finally {
        await app.close();
    }
}

bootstrap();
