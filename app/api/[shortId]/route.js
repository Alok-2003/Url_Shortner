import connectMongo from "@/lib/dbConnect";
import Url from "@/models/urlModel";

export async function GET(req, { params }) {
  const { shortId } = await params; // Extract shortId from the route

  try {
    await connectMongo(); // Connect to MongoDB

    const url = await Url.findOne({ shortId }); // Find URL by shortId

    if (!url) {
      return new Response(JSON.stringify({ error: "URL not found" }), {
        status: 404,
      });
    }

    // Return the original URL
    return new Response(JSON.stringify({ originalUrl: url.originalUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching URL:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
