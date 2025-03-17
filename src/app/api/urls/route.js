import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const dbFilePath = path.resolve('db.json');
        const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
        return new Response(JSON.stringify(db.urls), {
            status: 200,
        });
    } catch (error) {
        console.error('Erreur lors de la lecture du fichier db.json:', error);
        return new Response('Erreur serveur', { status: 500 });
    }
}
