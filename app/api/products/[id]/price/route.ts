import { db } from "@/lib/db";
import { getPriceFromMatrix } from "@/lib/price";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id: idStr } = await params;
    const id = Number(idStr);
    if (!Number.isInteger(id)) return new Response("invalid id", { status: 400 });

    const url = new URL(req.url);
    const size = url.searchParams.get("size");
    const quality = url.searchParams.get("quality");
    if (!size || !quality) return new Response("missing size or quality", { status: 400 });

    const [product] = await db.selectFrom("products").selectAll().where("id", "=", id).execute();
    if (!product) return new Response("not found", { status: 404 });

    const price = getPriceFromMatrix(product, size, quality);
    if (price === null) return new Response("price not found for given size/quality", { status: 400 });

    return new Response(JSON.stringify({ id, size, quality, price }), { headers: { "content-type": "application/json" } });
}