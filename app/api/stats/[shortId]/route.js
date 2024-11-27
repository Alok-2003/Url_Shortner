import connectMongo from '@/lib/dbConnect';
import Url from '@/models/urlModel';

export async function GET(req, { params }) {
    await connectMongo();

    // Wait for the dynamic parameters
    const { shortId } = await params; // await params

    try {
        const url = await Url.findOne({ shortId });
        // console.log(url); // Ensure the url object is being fetched correctly

        if (!url) {
            return new Response(JSON.stringify({ message: 'URL not found' }), { status: 404 });
        }

        return new Response(JSON.stringify({
            originalUrl: url.originalUrl,
            clickCount: url.clickCount,
            lastAccessed: url.lastAccessed,
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error retrieving stats' }), { status: 500 });
    }
}
