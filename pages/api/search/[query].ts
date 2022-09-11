import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interfaces'
import { Product } from '../../../models'

type Data = 
| { message: string }
| IProduct[]


export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return serachProducts(req, res)
        default:
            res.status(400).json({ message: 'Bad request' })
    }
}

const serachProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    let { query = '' } = req.query;

    if (query.length == 0 ){
        return res.status(404).json({ message: 'Should to specify a query for search items' })
    }

    query = query.toString().toLowerCase();

    await db.connect();
    const products = await Product.find({
        $text: {$search: query}
    })
    .select('title images precio inStock slug -_id')
    .lean();
    
    await db.disconnect();

    return res.status(200).json( products )
}