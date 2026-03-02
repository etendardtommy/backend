import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkArticles() {
  const articles = await prisma.article.findMany({
    select: { id: true, title: true, imageUrl: true }
  });
  console.log(articles);
}

checkArticles().finally(() => prisma.$disconnect());
