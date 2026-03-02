"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./src/app.module");
const auth_service_1 = require("./src/auth/auth.service");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const authService = app.get(auth_service_1.AuthService);
    try {
        const user = await authService.register({
            username: 'admin',
            password: 'adminPassword123!',
            name: 'Super Admin',
        });
        console.log('Utilisateur admin créé avec succès!', user.username);
    }
    catch (err) {
        if (err.status === 409) {
            console.log('L\'utilisateur admin existe déjà.');
        }
        else {
            console.error('Erreur lors de la création de l\'admin:', err);
        }
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=create-admin.js.map