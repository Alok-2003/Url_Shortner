'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
  const router = useRouter();

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      const shortId = await params.shortId; // Extract the shortId from the URL

      try {
        // Fetch data from the API
        const res = await fetch(`/api/${shortId}`);

        if (!res.ok) {
          console.error("Failed to fetch original URL");
          router.push("/"); // Redirect to homepage if the API fails
          return;
        }

        const data = await res.json();

        // Try redirecting to the original URL
        try {
          // Perform the redirect (this will throw NEXT_REDIRECT during development)
          router.push(data.originalUrl);
        } catch {
          // Do nothing here, as NEXT_REDIRECT is expected during the redirect
        }
      } catch (error) {
        console.error("Error fetching original URL:", error);
        router.push("/"); // Redirect to homepage in case of an error
      }
    };

    redirectToOriginalUrl();
  }, [params.shortId, router]);

  // Fallback render (this won't be reached due to redirection)
  return <div>Redirecting...</div>;
}
