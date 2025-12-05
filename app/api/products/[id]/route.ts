export const runtime = "edge";

import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const idNum = Number(id);
    if (!Number.isInteger(idNum)) return new Response("invalid id", { status: 400 });

    const [row] = await db.selectFrom("products").select(["id", "name", "image_url", "sizes", "qualities"]).where("id", "=", idNum).execute();
    if (!row) return new Response("not found", { status: 404 });

    return new Response(JSON.stringify(row), { headers: { "content-type": "application/json" } });
}