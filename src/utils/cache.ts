import fs from 'fs';
import path from 'path';

const cacheFilePath = path.join(process.cwd(), 'cache', 'data.json');

export const readCache = async () => {
    if (fs.existsSync(cacheFilePath)) {
        const data = await fs.promises.readFile(cacheFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return null;
};

export const writeCache = async (data: any) => {
    await fs.promises.mkdir(path.dirname(cacheFilePath), { recursive: true });
    await fs.promises.writeFile(cacheFilePath, JSON.stringify(data), 'utf-8');
};
