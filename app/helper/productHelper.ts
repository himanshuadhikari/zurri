import { Product } from "@/types";

export function parseStringObject(product: Product) {
    product.images = JSON.parse(product.images || "[]");
    product.sizes = JSON.parse(product.sizes || "[]");
    product.colors = JSON.parse(product.colors || "[]");
    product.details = JSON.parse(product.details || "[]");
    return product;
}