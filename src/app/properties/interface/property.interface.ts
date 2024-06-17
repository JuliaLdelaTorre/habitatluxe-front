export interface Property {

    id: number;
    seller_id: number;
    property_name: string;
    description: string;
    price: string;
    status: string;
    last_seller_modif: string | null;
    img: string;
    images: string[];
    created_at: string;
    updated_at: string | null;
    showMore: boolean;
    isLiked: boolean;
}
