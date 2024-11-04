module.exports = {
    i18n: {
      locales: ['cs-CZ', 'en', 'ru'], // Укажи точную локаль
      defaultLocale: 'cs-CZ',          // Локаль по умолчанию
      localeDetection: false,          // Отключаем автоматическое определение языка браузера
    },
    reactStrictMode: true,
    images: {
      domains: ['localhost'], // Если используешь изображения, хранящиеся локально на сервере Strapi
    },
  };
  