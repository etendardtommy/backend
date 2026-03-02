import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAndCreateSites() {
    try {
        const sites = await prisma.site.findMany();
        console.log(`Nombre de sites trouvés: ${sites.length}`);

        if (sites.length === 0) {
            console.log('Création du site par défaut "Portfolio"...');
            const newSite = await prisma.site.create({
                data: {
                    name: 'Portfolio',
                    description: 'Mon site principal',
                }
            });
            console.log('Site créé avec succès:', newSite);
        } else {
            console.log('Sites existants:', sites);
        }
    } catch (error) {
        console.error('Erreur:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkAndCreateSites();
