// Импортируем домен Strapi из переменной окружения
const strapiBaseUrl = process.env.STRAPI_BASE_URL.replace(/^https?:\/\//, ''); // убираем http/https для чистого домена

module.exports = {
  i18n: {
    locales: ['cs-CZ', 'en', 'ru'], // Укажи точную локаль
    defaultLocale: 'cs-CZ',         // Локаль по умолчанию
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: strapiBaseUrl,  // Используем домен Strapi
        port: '',
        pathname: '/**',          // Разрешаем все пути на этом домене
      },
    ],
  },
};
