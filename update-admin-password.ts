import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function updatePassword() {
    try {
        const saltOrRounds = 10;
        const newPassword = '244352T0mmy!*';
        const hashedPassword = await bcrypt.hash(newPassword, saltOrRounds);

        const user = await prisma.user.update({
            where: {
                username: 'admin'
            },
            data: {
                password: hashedPassword
            }
        });

        console.log('Mot de passe mis à jour avec succès pour l\'utilisateur:', user.username);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du mot de passe:', error);
    } finally {
        await prisma.$disconnect();
    }
}

updatePassword();
