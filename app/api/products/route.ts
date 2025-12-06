import { db } from "@/lib/db";

export async function GET() {
    const rows = await db.selectFrom("products")
        .select(["id", "name", "image_url", "sizes", "qualities"])
        .orderBy("created_at", "desc")
        .limit(100)
        .execute();
    return new Response(JSON.stringify(rows), { headers: { "content-type": "application/json" } });
}

export async function POST(req: Request) {
    const body = await req.json().catch(() => null);
    if (!body) return new Response("invalid json", { status: 400 });

    const { name, image_url, sizes, qualities, price_matrix } = body;
    if (!name || !image_url || !Array.isArray(sizes) || !Array.isArray(qualities) || !Array.isArray(price_matrix)) {
        return new Response("missing/invalid fields", { status: 400 });
    }

    const result = await db.insertInto("products").values({
        name,
        image_url,
        sizes,
        qualities,
        price_matrix
    }).returningAll().execute();

    return new Response(JSON.stringify(result[0] ?? result), { headers: { "content-type": "application/json" }, status: 201 });
}