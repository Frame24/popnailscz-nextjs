import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

// Создаём папку uploads, если её нет
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Функция для скачивания изображения
const downloadImage = async (url: string, dest: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Ошибка загрузки ${url}: ${response.statusText}`);
    const buffer = await response.buffer();
    fs.writeFileSync(dest, buffer);
    console.log(`Изображение сохранено: ${dest}`);
};

// Функция для обработки массива изображений
const processImages = async (imageDataArray: any[]) => {
    for (const item of imageDataArray) {
        const images = Array.isArray(item.Image) ? item.Image : [item.Image];
        for (const image of images) {
            if (image?.url) {
                const imageUrl = `${process.env.STRAPI_BASE_URL}${image.url}`;
                const dest = path.join(uploadsDir, path.basename(image.url));
                try {
                    await downloadImage(imageUrl, dest);
                } catch (err) {
                    console.error(`Ошибка скачивания ${imageUrl}:`, err);
                }
            }
        }
    }
};

export default processImages;
