import { Product } from "@/types";

export function parseStringObject(product: Product) {
    product.images = JSON.parse(product.images || "[]");
    product.sizes = JSON.parse(product.sizes || "[]");
    product.colors = JSON.parse(product.colors || "[]");
    product.details = JSON.parse(product.details || "[]");
    product.price = +product.price;
    product.comparePrice = +product.comparePrice;
    product.variants = product.variants.map(variant => {
        return {
            ...variant,
            images: JSON.parse(variant.images || "[]")
        }
    })
    return product;
}