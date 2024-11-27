import connectMongo from "@/lib/dbConnect";  // Ensure dbConnect is correctly set up
import Url from "@/models/urlModel"; // Adjust the model path if necessary

export async function GET(req, { params }) {
  const { shortId } = await params;

  try {
    // Connect to MongoDB
    await connectMongo();

    // Find the URL by shortId
    const url = await Url.findOne({ shortId });

    if (!url) {
      return new Response(JSON.stringify({ error: 'URL not found' }), {
        status: 404,
      });
    }

    // Increment clickCount
    url.clickCount += 1;
    url.lastAccessed = new Date(); // Optionally, update lastAccessed time

    // Save the updated document
    await url.save();

    // Return the original URL
    return new Response(JSON.stringify({ originalUrl: url.originalUrl }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error handling URL redirect:", error);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  }
}
