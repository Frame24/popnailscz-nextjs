const axios = require('axios');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
require('dotenv').config();

const strapiBaseUrl = process.env.STRAPI_BASE_URL;

if (!strapiBaseUrl) {
    throw new Error('STRAPI_BASE_URL не задана в переменных окружения');
}

const downloadImages = async (uploadsDir) => {
    console.log(`Запуск загрузки и конвертации изображений`);

    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    try {
        const response = await axios.get(`${strapiBaseUrl}/api/upload/files`);
        const images = response.data;

        const imagesToProcess = images.filter((image) => {
            const webpPath = path.join(
                uploadsDir,
                `${path.basename(image.url, path.extname(image.url))}.webp`
            );

            // Если нет .webp, файл нужно обработать
            return !fs.existsSync(webpPath);
        });

        const skippedCount = images.length - imagesToProcess.length;

        console.log(`Изображений для загрузки и конвертации: ${imagesToProcess.length}`);
        console.log(`Пропущено изображений (уже обработаны): ${skippedCount}`);

        if (imagesToProcess.length === 0) {
            console.log('Все изображения уже обработаны.');
            return { downloaded: 0, skipped: skippedCount };
        }

        const processPromises = imagesToProcess.map(async (image) => {
            const imageUrl = `${strapiBaseUrl}${image.url}`;
            const webpPath = path.join(
                uploadsDir,
                `${path.basename(image.url, path.extname(image.url))}.webp`
            );

            // Скачиваем изображение и сразу сохраняем как .webp
            const downloadResponse = await axios({
                url: imageUrl,
                method: 'GET',
                responseType: 'arraybuffer', // Загружаем файл в буфер
            });

            // Конвертируем изображение в WebP
            await sharp(downloadResponse.data)
                .webp({ quality: 80 })
                .toFile(webpPath);
        });

        await Promise.all(processPromises);

        console.log(
            `Загрузка и конвертация завершены. Обработано изображений: ${imagesToProcess.length}`
        );

        return { downloaded: imagesToProcess.length, skipped: skippedCount };
    } catch (err) {
        console.error('Ошибка загрузки или конвертации изображений:', err.message || err);
        throw err;
    }
};

// Если файл запускается напрямую, выполняем функцию
if (require.main === module) {
    const uploadsDir = path.join(__dirname, '../../public/uploads');
    downloadImages(uploadsDir)
        .then(({ downloaded, skipped }) => {
            console.log(`Изображения успешно обработаны. Скачано: ${downloaded}, Пропущено: ${skipped}`);
        })
        .catch((err) => console.error('Ошибка:', err.message || err));
}

// Экспортируем функцию
module.exports = { downloadImages };
