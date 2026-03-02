import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkProjects() {
    const projects = await prisma.project.findMany();
    console.log('Projects in DB:', JSON.stringify(projects, null, 2));
}

checkProjects()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
