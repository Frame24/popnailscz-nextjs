import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST' && req.headers['x-strapi-signature'] === process.env.NEXT_REVALIDATE_TOKEN) {
        try {
            // Путь к папке uploads
            const uploadsDir = path.join(process.cwd(), 'public/uploads');
            
            // Очищаем папку uploads
            await clearUploadsFolder(uploadsDir);

            // Выполняем revalidate страниц
            await res.revalidate('/'); // Главная страница
            await res.revalidate('/en'); // Главная страница
            await res.revalidate('/ru'); // Главная страница

            return res.json({ revalidated: true, message: 'Папка uploads очищена' });
        } catch (err) {
            console.error('Ошибка в обработке запроса:', err);
            return res.status(500).json({ message: 'Ошибка при revalidate или очистке папки' });
        }
    } else {
        return res.status(401).json({ message: 'Неверный токен' });
    }
}
