export const runtime = "edge";

import { Pool } from "@neondatabase/serverless";
import { Kysely, PostgresDialect } from "kysely";

const sql = new Pool({ connectionString: process.env.DATABASE_URL! });

export interface ProductRow {
    id?: number;
    name: string;
    image_url: string;
    sizes: string[];
    qualities: string[];
    price_matrix: number[][];
    created_at?: string;
}

export interface Database {
    products: ProductRow;
}

export const db = new Kysely<Database>({
    dialect: new PostgresDialect({ pool: sql })
});