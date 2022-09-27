import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { IProduct } from '../../../interfaces';
import { Product } from '../../../models';
import { isValidObjectId } from 'mongoose';
import {v2 as cloudinary} from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data = 
| { message: string }
| IProduct[]
| IProduct

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getProducts(req, res);
        case 'PUT':
            return updateProduct(req, res);
        case 'POST':
            return createProduct(req, res);
        default:
            return res.status(400).json({ message: 'Bad Request' })
    }
    
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect();

    const products = await Product.find()
        .sort({title: 'asc'})
        .lean();
    await db.disconnect();

    const updaetdProducts = products.map( product => {
        product.images = product.images.map ( image => {
            return image.includes('http') ? image : `${ process.env.HOST_NAME }products/${image}`
        })
        return product
    });

    return res.status(200).json(updaetdProducts)

}
const updateProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {_id = '', images = []} = req.body as IProduct;

    if(!isValidObjectId(_id)){
        return res.status(400).json({message: 'ID product is not valid'});
    }

    if(images.length < 2) {
        return res.status(400).json({message: 'You need to upload at minimum 2 images'});
    }

    try {
        await db.connect();
        const product = await Product.findById(_id);
        if(!product) {
            await db.disconnect();
            return res.status(400).json({message: 'We can not find a product with this identifier'});
        }

        product.images.forEach( async(image) => {
            // If not include
            if(!images.includes(image)) {
                // Delete on cloudinary
                const [fileId, fileExtension] = image.substring( image.lastIndexOf('/') + 1).split('.')
                await cloudinary.uploader.destroy(fileId);
            }
        })

        await product.update(req.body);
        await db.disconnect();

        return res.status(200).json(product);
        
    } catch (error) {
        console.log(error)
        await db.disconnect();
        return res.status(400).json({message: 'Check on server side'});
    }

}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { images = [] } = req.body as IProduct;

    if(images.length < 2 ){
        return res.status(400).json({message: 'You need to upload at minimum 2 images'});
    }

    try {
        await db.connect();

        const productInDb = await Product.findOne({ slug: req.body.slug});

        if(productInDb) {
            await db.disconnect();
            return res.status(400).json({message: 'Allready exists a product with this slug'});   
        }

        const product = new Product(req.body);
        await product.save();
        await db.disconnect();

        return res.status(200).json(product);
        
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(400).json({message: 'Check on server side'});
    }

}

