'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
  const router = useRouter();

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      const shortId = await params.shortId; // Get shortId from the URL parameters

      try {
        // Fetch data from the API (it will also increment click count here)
        const res = await fetch(`/api/${shortId}`);

        if (!res.ok) {
          console.error("Failed to fetch original URL");
          router.push("/"); // Redirect to homepage if the API fails
          return;
        }

        const data = await res.json();

        // Try redirecting to the original URL
        router.push(data.originalUrl);
      } catch (error) {
        console.error("Error fetching original URL:", error);
        router.push("/"); // Redirect to homepage in case of an error
      }
    };

    redirectToOriginalUrl();
  }, [params.shortId, router]);

  // Fallback render (this won't be reached due to redirection)
  return (/* From Uiverse.io by devAaus */ 
    <div class="flex-col gap-4 w-full h-screen flex items-center justify-center">
    <div
      class="w-24 h-24 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
    >
      <div
        class="w-20 h-20 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
      ></div>
    </div>
  </div>
    );
}
