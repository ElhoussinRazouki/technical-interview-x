// 'use server'
import { db } from '@/lib/db';


// this will be called by vercel cron job every 20 minutes, but it can be also adjusted to be a webhook endpoint (event-driven approach)
export async function GET(request: Request) {
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 });

    const externalPrices = await fetchExternalPrices(); // Your API call
    externalPrices.map(async (item: { id: number; price_matrix: number[][] }) => {
        await db.updateTable('products').set({ price_matrix: item.price_matrix }).where('id', '=', item.id).execute();
    });
    return Response.json({ success: true });
}

async function fetchExternalPrices() {
    // fetching the prices from an external API
    return [
        { id: 2, price_matrix: [[95, 125, 150], [100, 130, 155], [105, 135, 160], [110, 140, 165]] }
    ];
}