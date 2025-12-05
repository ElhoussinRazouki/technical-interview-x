// 'use server'
import { db } from '@/lib/db';


// this will be called by vercel cron job every 20 minutes, but it can be also adjusted to be a webhook endpoint (event-driven approach)
export async function GET(request: Request) {
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 });

    const externalPrices = await fetchExternalPrices(); // Your API call
    await db.updateTable('products').set({ price_matrix: externalPrices }).execute();
    return Response.json({ success: true });
}

async function fetchExternalPrices() {
    // fetching the prices from an external API
    return [
        /* ... */
    ];
}