'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [url, setUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const handleShorten = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post('/api/shorten', { originalUrl: url });
            setShortUrl(data.shortUrl);
        } catch (error) {
            console.error(error);
            alert('Failed to shorten URL');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">URL Shortener</h1>
                <div className="mb-4">
                    <input
                        type="url"
                        placeholder="Enter a URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>
                <button
                    onClick={handleShorten}
                    className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Shortening...' : 'Shorten'}
                </button>
                {shortUrl && (
                    <p className="mt-4 text-center text-sm text-gray-700">
                        Shortened URL:{' '}
                        <a
                            href={shortUrl}
                            className="text-indigo-500 underline hover:text-indigo-700"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {shortUrl}
                        </a>
                    </p>
                )}
            </div>
        </main>
    );
}
