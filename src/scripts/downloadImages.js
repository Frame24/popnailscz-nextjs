const axios = require('axios');
const fs = require('fs');
const path = require('path');

const strapiBaseUrl = process.env.STRAPI_BASE_URL;

async function downloadImages() {
  const uploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads');

  // Создаем папку uploads, если она не существует
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  try {
    // Получаем список изображений из Strapi
    const response = await axios.get(`${strapiBaseUrl}/api/upload/files`);
    const images = response.data;

    // Скачиваем изображения
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
    console.error('Ошибка загрузки изображений из Strapi:', err);
  }
}

// Выполняем скрипт
downloadImages();
