import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const projects = await prisma.project.findMany();
    console.log("ALL PROJECTS IN DATABASE:");
    console.dir(projects, { depth: null });

    const articles = await prisma.article.findMany();
    console.log("ALL ARTICLES IN DATABASE:");
    console.dir(articles, { depth: null });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
