import { db } from "."
import Product from '../models/Product';
import { IProduct } from '../interfaces';


export const getProductBySlug = async (slug: string): Promise<IProduct | null> => {
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();

    if (!product) {
        return null;
    }

    return JSON.parse( JSON.stringify(product));
}


interface ProductSlug {
    slug: string;
}

export const getAllProductsBySlug = async (): Promise<ProductSlug[]> => {
    await db.connect()
    const slug = await Product.find().select('slug -_id').lean()
    await db.disconnect()
    return slug;
}


export const getProductsBySearch = async (search: string): Promise<IProduct[]> => {
    search = search.toString().toLowerCase();

    await db.connect();
    const products = await Product.find({
        $text: {$search: search}
    })
    .select('title images precio inStock slug -_id')
    .lean();
    
    await db.disconnect();

    return products;
}