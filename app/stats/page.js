'use client';

import { useState } from 'react';
import axios from 'axios';

export default function Stats() {
    const [urlInput, setUrlInput] = useState(''); // Updated to handle full URL input
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);

    // Extract shortId from the full URL
    const extractShortId = (url) => {
        try {
            const urlObj = new URL(url);
            return urlObj.pathname.slice(1); // Assuming shortId is right after "/"
        } catch (error) {
            return url; // If URL constructor fails, treat it as shortId directly
        }
    };

    const fetchStats = async () => {
        setLoading(true);
        setStats(null); // Clear previous stats
        try {
            const shortId = extractShortId(urlInput);
    console.log(shortId)

            const { data } = await axios.get(`/api/stats/${shortId}`);
            setStats(data);
        } catch (error) {
            console.error(error);
            alert('Failed to fetch stats. Please check the URL or Short ID.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center text-green-600">URL Statistics</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Paste short URL or enter Short ID"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                </div>
                <button
                    onClick={fetchStats}
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                    disabled={loading}
                >
                    {loading ? 'Fetching...' : 'Get Stats'}
                </button>
                {stats && (
                    <div className="mt-4 text-sm text-gray-700">
                        <p>
                            <strong>Original URL:</strong> {stats.originalUrl}
                        </p>
                        <p>
                            <strong>Click Count:</strong> {stats.clickCount}
                        </p>
                        <p>
                            <strong>Last Accessed:</strong>{' '}
                            {new Date(stats.lastAccessed).toLocaleString()}
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}
