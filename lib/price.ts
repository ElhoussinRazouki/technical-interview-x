export function getPriceFromMatrix(
    product: { sizes: string[]; qualities: string[]; price_matrix: number[][] },
    size: string,
    quality: string
): number | null {
    const s = product.sizes.indexOf(size);
    const q = product.qualities.indexOf(quality);
    if (s === -1 || q === -1) return null;
    const row = product.price_matrix[s];
    if (!Array.isArray(row)) return null;
    const val = row[q];
    return typeof val === "number" ? val : null;
}