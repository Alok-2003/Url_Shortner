import connectMongo from '@/lib/dbConnect';
import Url from '@/models/urlModel';
import { nanoid } from 'nanoid';

export async function POST(req) {
    const { originalUrl } = await req.json();

    try {
        await connectMongo();

        const shortId = nanoid(8); // Generate shortId
        const newUrl = new Url({ originalUrl, shortId });
        await newUrl.save();

        // Return the full shortened URL
        const shortenedUrl = `${process.env.BASE_URL}/${shortId}`;
        return new Response(JSON.stringify({ shortUrl: shortenedUrl }), { status: 201 });
    } catch (error) {
        console.error('Error creating shortened URL:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}

