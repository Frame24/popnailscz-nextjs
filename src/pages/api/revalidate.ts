import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

const strapiBaseUrl = process.env.STRAPI_BASE_URL; // URL Strapi API

const clearUploadsFolder = async (folderPath: string) => {
    try {
        const files = await fs.promises.readdir(folderPath);

        for (const file of files) {
            const filePath = path.join(folderPath, file);
            const fileStats = await fs.promises.stat(filePath);

            if (fileStats.isFile()) {
                await fs.promises.unlink(filePath);
            } else if (fileStats.isDirectory()) {
                await clearUploadsFolder(filePath); // Рекурсивная очистка вложенных папок
                await fs.promises.rmdir(filePath);
            }
        }
    } catch (err) {
        console.error('Ошибка при очистке папки uploads:', err);
    }
};

const downloadAndUpdateImages = async (uploadsDir: string) => {
    try {
        // Получаем список изображений из Strapi
        const response = await axios.get(`${strapiBaseUrl}/api/upload/files`);
        const images = response.data;

        for (const image of images) {
            const imageUrl = `${strapiBaseUrl}${image.url}`;
            const imagePath = path.join(uploadsDir, path.basename(image.url));

            // Проверяем, существует ли файл
            const fileExists = fs.existsSync(imagePath);
            if (fileExists) {
                // Сравниваем время изменения файла с временем изменения на сервере
                const fileStats = await fs.promises.stat(imagePath);
                const lastModifiedLocal = new Date(fileStats.mtime).getTime();
                const lastModifiedRemote = new Date(image.updatedAt).getTime();

                if (lastModifiedLocal >= lastModifiedRemote) {
                    console.log(`Файл актуален: ${imagePath}`);
                    continue; // Пропускаем файл, если он актуален
                }
            }

            // Если файл отсутствует или устарел, скачиваем
            console.log(`Скачиваю: ${imageUrl}`);
            const writer = fs.createWriteStream(imagePath);
            const downloadResponse = await axios({
                url: imageUrl,
                method: 'GET',
                responseType: 'stream',
            });

            downloadResponse.data.pipe(writer);

            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            console.log(`Скачано: ${imagePath}`);
        }
    } catch (err) {
        console.error('Ошибка загрузки изображений из Strapi:', err);
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST' && req.headers['x-strapi-signature'] === process.env.NEXT_REVALIDATE_TOKEN) {
        try {
            // Путь к папке uploads
            const uploadsDir = path.join(process.cwd(), 'public/uploads');

            // Скачиваем изображения и обновляем устаревшие
            await downloadAndUpdateImages(uploadsDir);

            // Выполняем revalidate страниц
            await res.revalidate('/'); // Главная страница
            await res.revalidate('/en'); // Главная страница
            await res.revalidate('/ru'); // Главная страница

            return res.json({ revalidated: true, message: 'Изображения обновлены, страницы revalidate выполнен' });
        } catch (err) {
            console.error('Ошибка в обработке запроса:', err);
            return res.status(500).json({ message: 'Ошибка при revalidate или обновлении изображений' });
        }
    } else {
        return res.status(401).json({ message: 'Неверный токен' });
    }
}
