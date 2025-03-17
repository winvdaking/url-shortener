import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

const dbFilePath = path.join(process.cwd(), 'db.json');

export default function RedirectPage({ params }) {
    const { code } = params;

    const db = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
    const urlData = db.urls.find((entry) => entry.code === code);

    if (urlData) {
        // Rediriger vers l'URL d'origine
        if (typeof window !== 'undefined') {
            window.location.href = urlData.originalUrl;
        }
    } else {
        notFound(); // Si le code n'existe pas, page 404
    }

    return <div>Redirecting...</div>;
}
