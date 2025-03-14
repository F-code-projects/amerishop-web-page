export interface Product {
    product_id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    brand: Brand;
}

interface Brand {
    brand_id: string;
    name: string;
}