import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { NextApiRequest, NextApiResponse } from 'next';
import sharp from 'sharp';

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
        const webpFileName = fileName.replace(/\.\w+$/, '.webp');
        const localPath = path.join(uploadsDir, fileName);
        const webpPath = path.join(uploadsDir, webpFileName);

        // Если WebP существует, возвращаем его
        if (fs.existsSync(webpPath)) {
            res.setHeader('Content-Type', 'image/webp');
            const fileStream = fs.createReadStream(webpPath);
            fileStream.pipe(res);
            return;
        }

        // Если оригинал существует, возвращаем его и создаём WebP в фоне
        if (fs.existsSync(localPath)) {
            res.setHeader('Content-Type', 'image/jpeg'); // Убедитесь, что MIME-тип соответствует
            const fileStream = fs.createReadStream(localPath);
            fileStream.pipe(res);

            // Асинхронно создаём WebP
            sharp(localPath)
                .webp({ quality: 80 })
                .toFile(webpPath)
                .catch((error) => console.warn('Ошибка при создании WebP:', error.message));
            return;
        }

        // Загружаем изображение, если оно отсутствует локально
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(500).json({ error: 'Ошибка при загрузке изображения' });
        }

        const buffer = await response.buffer();

        // Сохраняем оригинальное изображение
        fs.writeFileSync(localPath, buffer);

        // Если запрашивается WebP или создаём WebP-версию
        try {
            const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
            fs.writeFileSync(webpPath, webpBuffer);

            res.setHeader('Content-Type', 'image/webp');
            res.write(webpBuffer);
            res.end();
        } catch (error) {
            console.warn('Ошибка при создании WebP:', error.message);

            // Если WebP не удалось создать, возвращаем оригинал
            res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
            res.write(buffer);
            res.end();
        }
    } catch (error) {
        console.error('Ошибка обработки изображения:', error.message || error);
        return res.status(500).json({ error: 'Ошибка обработки изображения' });
    }
}
