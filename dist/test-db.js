"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
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
//# sourceMappingURL=test-db.js.map