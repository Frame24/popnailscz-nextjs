import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

// Создаём папку uploads, если её нет
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { url } = req.query;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'URL параметр обязателен' });
    }

    try {
        const fileName = path.basename(new URL(url).pathname);
        const localPath = path.join(uploadsDir, fileName);

        // Если файл уже существует, возвращаем его
        if (fs.existsSync(localPath)) {
            res.setHeader('Content-Type', 'image/jpeg'); // Укажите правильный MIME тип, если известен
            const fileStream = fs.createReadStream(localPath);
            fileStream.pipe(res);
            return;
        }

        // Загружаем изображение
        const response = await fetch(url);

        if (!response.ok) {
            return res.status(500).json({ error: 'Ошибка при загрузке изображения' });
        }

        const buffer = await response.buffer();

        // Сохраняем файл в public/uploads
        fs.writeFileSync(localPath, buffer);
        console.log(`Изображение сохранено: ${localPath}`);

        // Отправляем файл клиенту
        res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
        res.write(buffer);
        res.end();
    } catch (error) {
        console.error('Ошибка обработки изображения:', error);
        return res.status(500).json({ error: 'Ошибка обработки изображения' });
    }
}
