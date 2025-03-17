import fs from 'fs';
import path from 'path';

const dbFilePath = path.join(process.cwd(), 'db.json');

const generateShortUrl = () => {
    return Math.random().toString(36).substring(2, 8);
};

export async function POST(req) {
    const { url } = await req.json();
    const shortUrlCode = generateShortUrl();
    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortUrlCode}`;

    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

    db.urls.push({ code: shortUrlCode, originalUrl: url });

    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));

    return new Response(JSON.stringify({ shortUrl }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
