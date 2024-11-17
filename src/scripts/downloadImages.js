const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const strapiBaseUrl = process.env.STRAPI_BASE_URL;

if (!strapiBaseUrl) {
    throw new Error('STRAPI_BASE_URL не задана в переменных окружения');
}

const downloadImages = async (uploadsDir) => {
    console.log(`Запуск загрузки изображений`);

    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    try {
        const response = await axios.get(`${strapiBaseUrl}/api/upload/files`);
        const images = response.data;

        // Фильтруем изображения, которых нет локально
        const imagesToDownload = images.filter((image) => {
            const imagePath = path.join(uploadsDir, path.basename(image.url));
            return !fs.existsSync(imagePath);
        });

        const skippedCount = images.length - imagesToDownload.length;

        console.log(`Изображений для загрузки: ${imagesToDownload.length}`);
        console.log(`Пропущено изображений (уже загружены): ${skippedCount}`);

        if (imagesToDownload.length === 0) {
            console.log('Все изображения уже загружены.');
            return { downloaded: 0, skipped: skippedCount };
        }

        // Собираем массив промисов для загрузки изображений
        const downloadPromises = imagesToDownload.map(async (image) => {
            const imageUrl = `${strapiBaseUrl}${image.url}`;
            const imagePath = path.join(uploadsDir, path.basename(image.url));

            const writer = fs.createWriteStream(imagePath);

            const downloadResponse = await axios({
                url: imageUrl,
                method: 'GET',
                responseType: 'stream',
            });

            return new Promise((resolve, reject) => {
                downloadResponse.data.pipe(writer);
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
        });

        // Дожидаемся завершения всех скачиваний
        await Promise.all(downloadPromises);

        console.log(`Загрузка завершена. Скачано изображений: ${imagesToDownload.length}`);

        return { downloaded: imagesToDownload.length, skipped: skippedCount };
    } catch (err) {
        console.error('Ошибка загрузки изображений из Strapi:', err.message || err);
        throw err; // Пробрасываем ошибку для обработки в вызывающем коде
    }
};

// Если файл запускается напрямую, выполняем функцию
if (require.main === module) {
    const uploadsDir = path.join(__dirname, '../../public/uploads');
    downloadImages(uploadsDir)
        .then(({ downloaded, skipped }) =>
            console.log(`Изображения успешно загружены. Скачано: ${downloaded}, Пропущено: ${skipped}`)
        )
        .catch((err) => console.error('Ошибка при загрузке изображений:', err.message || err));
}

// Экспортируем функцию
module.exports = { downloadImages };
