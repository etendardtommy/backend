"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function checkProjects() {
    const projects = await prisma.project.findMany();
    console.log('Projects in DB:', JSON.stringify(projects, null, 2));
}
checkProjects()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
//# sourceMappingURL=check-projects.js.map