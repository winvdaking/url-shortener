import fs from 'fs';
import path from 'path';

const dbFilePath = path.join(process.cwd(), 'db.json');

const generateShortUrl = () => {
    return Math.random().toString(36).substring(2, 8); // Génère un code court
};

export async function POST(req) {
    const { url } = await req.json();
    const shortUrlCode = generateShortUrl();
    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortUrlCode}`;

    // Lire db.json
    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

    // Ajouter la nouvelle URL dans la base
    db.urls.push({ code: shortUrlCode, originalUrl: url });

    // Sauvegarder db.json
    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));

    return new Response(JSON.stringify({ shortUrl }), {
        headers: { 'Content-Type': 'application/json' },
    });
}
