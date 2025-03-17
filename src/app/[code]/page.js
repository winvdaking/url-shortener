'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectPage({ params }) {
    const [originalUrl, setOriginalUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    // Déballage des paramètres avec React.use() (attente de la promesse)
    const { code } = React.use(params);

    useEffect(() => {
        const fetchUrl = async () => {
            try {
                // Appel à l'API pour récupérer les URLs
                const response = await fetch('/api/urls');
                const data = await response.json();
                const urlData = data.find((entry) => entry.code === code);

                if (urlData) {
                    setOriginalUrl(urlData.original);
                } else {
                    setOriginalUrl(null);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
                setOriginalUrl(null);
            } finally {
                setLoading(false);
            }
        };

        if (code) {
            fetchUrl();
        }
    }, [code]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (!originalUrl) {
        return <p>URL non trouvée, redirection impossible...</p>;
    }

    useEffect(() => {
        if (originalUrl) {
            setTimeout(() => {
                window.location.href = originalUrl;
            }, 2000);
        }
    }, [originalUrl]);

    return <p>Redirection en cours vers {originalUrl}...</p>;
}
