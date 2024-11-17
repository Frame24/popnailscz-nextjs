const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const strapiBaseUrl = process.env.STRAPI_BASE_URL;

if (!strapiBaseUrl) {
    throw new Error('STRAPI_BASE_URL не задана в переменных окружения');
}

const downloadImages = async () => {
    console.log(`downloadImages`);

    const uploadsDir = path.join(__dirname, '../../public/uploads');

    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    try {
        const response = await axios.get(`${strapiBaseUrl}/api/upload/files`);
        const images = response.data;

        for (const image of images) {
            const imageUrl = `${strapiBaseUrl}${image.url}`;
            const imagePath = path.join(uploadsDir, path.basename(image.url));

            if (!fs.existsSync(imagePath)) {
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
            } else {
                console.log(`Файл уже существует: ${imagePath}`);
            }
        }
    } catch (err) {
        console.error('Ошибка загрузки изображений из Strapi:', err.message || err);
    }
};

downloadImages();
