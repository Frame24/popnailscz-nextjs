const fs = require('fs');
const path = require('path');

function clearUploadsFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    console.log(`Очищаю папку: ${folderPath}`);
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.unlinkSync(filePath); // Удаляем файл
      }
    });
    console.log(`Папка очищена.`);
  } else {
    console.log(`Папка ${folderPath} не существует, ничего не очищаю.`);
  }
}

// Исправленный путь к папке uploads
const uploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads');

// Выполняем очистку
clearUploadsFolder(uploadsDir);
