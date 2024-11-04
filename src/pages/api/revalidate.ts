// pages/api/revalidate.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Проверка на секретный токен, чтобы избежать нежелательных запросов
    if (req.query.secret !== process.env.NEXT_REVALIDATE_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    try {
        // Укажите здесь страницы, которые должны обновляться
        await res.revalidate('/');
        await res.revalidate('/some-other-page');
        // Добавьте другие страницы, если необходимо

        return res.json({ revalidated: true });
    } catch (err) {
        return res.status(500).send('Error revalidating');
    }
}
