/** @type {import('next-sitemap').IConfig} */
module.exports = {
  exclude: ['/page'], // Указываем путь к странице, которую хотим исключить
  siteUrl: 'https://popnails.cz', // Замените на URL вашего сайта
  generateRobotsTxt: true, // Создаст файл robots.txt
  changefreq: 'weekly', // Частота обновления карты
  priority: 0.7, // Приоритет страниц
  sitemapSize: 5000,
};
