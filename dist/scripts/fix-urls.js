"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const oldUrl = 'http://localhost:3000';
    console.log('--- Fixing Gallery Items ---');
    const galleryItems = await prisma.galleryItem.findMany();
    for (const item of galleryItems) {
        let changed = false;
        let dataToUpdate = {};
        if (item.imageUrl && item.imageUrl.includes(oldUrl)) {
            dataToUpdate.imageUrl = item.imageUrl.replace(oldUrl, '');
            changed = true;
        }
        if (item.videoUrl && item.videoUrl.includes(oldUrl)) {
            dataToUpdate.videoUrl = item.videoUrl.replace(oldUrl, '');
            changed = true;
        }
        if (changed) {
            await prisma.galleryItem.update({ where: { id: item.id }, data: dataToUpdate });
            console.log(`Updated GalleryItem ${item.id}`);
        }
    }
    console.log('--- Fixing Articles ---');
    const articles = await prisma.article.findMany();
    for (const item of articles) {
        let changed = false;
        let dataToUpdate = {};
        if (item.imageUrl && item.imageUrl.includes(oldUrl)) {
            dataToUpdate.imageUrl = item.imageUrl.replace(oldUrl, '');
            changed = true;
        }
        if (item.htmlContent && item.htmlContent.includes(oldUrl)) {
            dataToUpdate.htmlContent = item.htmlContent.split(oldUrl).join('');
            changed = true;
        }
        if (changed) {
            await prisma.article.update({ where: { id: item.id }, data: dataToUpdate });
            console.log(`Updated Article ${item.id}`);
        }
    }
    console.log('--- Fixing Portfolio Projects ---');
    const projects = await prisma.project.findMany();
    for (const item of projects) {
        let changed = false;
        let dataToUpdate = {};
        if (item.imageUrl && item.imageUrl.includes(oldUrl)) {
            dataToUpdate.imageUrl = item.imageUrl.replace(oldUrl, '');
            changed = true;
        }
        if (changed) {
            await prisma.project.update({ where: { id: item.id }, data: dataToUpdate });
            console.log(`Updated Project ${item.id}`);
        }
    }
    console.log('Done!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=fix-urls.js.map