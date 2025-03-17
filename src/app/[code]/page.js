'use client';

import React, { useEffect, useState } from 'react';

export default function RedirectPage({ params }) {
    const { code } = React.use(params); // Déballage des params

    const [originalUrl, setOriginalUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrl = async () => {
            const response = await fetch('/api/urls'); // Appel à l'API route
            const data = await response.json();
            const urlData = data.find((entry) => entry.code === code);
            setOriginalUrl(urlData ? urlData.originalUrl : null); // Utilisation de originalUrl
            setLoading(false);
        };

        if (code) fetchUrl();
    }, [code]);

    useEffect(() => {
        if (originalUrl) {
            setTimeout(() => {
                window.location.href = originalUrl;
            }, 2000);
        }
    }, [originalUrl]);

    if (loading) return <p>Chargement...</p>;
    if (!originalUrl) return <p>URL non trouvée</p>;

    return <p>Redirection vers {originalUrl}...</p>;
}
