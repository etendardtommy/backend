"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function checkArticles() {
    const articles = await prisma.article.findMany({
        select: { id: true, title: true, imageUrl: true }
    });
    console.log(articles);
}
checkArticles().finally(() => prisma.$disconnect());
//# sourceMappingURL=check-articles.js.map