import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Проверяем, что это POST-запрос и содержит правильный токен
    if (req.method === 'POST' && req.headers['x-strapi-signature'] === process.env.NEXT_REVALIDATE_TOKEN) {
        try {
            // Указываем страницы для revalidate
            await res.revalidate('/'); // Главная страница
            await res.revalidate('/en'); // Главная страница
            await res.revalidate('/ru'); // Главная страница
            return res.json({ revalidated: true });
        } catch (err) {
            return res.status(500).json({ message: 'Ошибка при revalidate' });
        }
    } else {
        // Если метод запроса не POST или токен не совпадает
        return res.status(401).json({ message: 'Неверный токен' });
    }
}
