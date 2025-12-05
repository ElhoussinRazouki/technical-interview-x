export const runtime = "edge";

import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    if (!Number.isInteger(id)) return new Response("invalid id", { status: 400 });

    const [row] = await db.selectFrom("products").select(["id", "name", "image_url", "sizes", "qualities"]).where("id", "=", id).execute();
    if (!row) return new Response("not found", { status: 404 });

    return new Response(JSON.stringify(row), { headers: { "content-type": "application/json" } });
}