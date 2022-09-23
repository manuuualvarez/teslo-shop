import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react';
import { db } from '../../../database';
import { IOrder } from '../../../interfaces/order';
import { Product, Order } from '../../../models';

type Data = 
| { message: string }
| IOrder

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
             return createOrder(req, res);
        default:
            return res.status(400).json({ message: 'Bad request' })
    }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { orderItems, total } = req.body as IOrder;
    // Check session
    const session: any = await getSession({ req });
    if(!session) {
        return res.status(401).json({ message: 'Bad request - Not allowed' })
    }
    // Array of the products
    const productsId = orderItems.map (product => product._id);
    await db.connect()
    // Get products from db when fit with the order
    const dbProducts = await Product.find({ _id: {$in: productsId} });
    // Validate the price with backend
    try {
        const subTotal = orderItems.reduce( ( prev, current ) => {
            const currentPrice = dbProducts.find( prod => prod.id === current._id )?.price;

            if(!currentPrice) {
                throw new Error("You can not manipulate the cart");
            }
            return (currentPrice * current.quantity) + prev
        }, 0 ); 
        
        const taxRate =  Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const backendTotal = subTotal * (taxRate + 1);

        if(total !== backendTotal) {
            throw new Error("Total is not correct with backend");
        }
        // Cart was not manipulated:
        const userId = session.user._id;
        const newOrder = new Order({ ...req.body, isPaid: false, user: userId });
        await newOrder.save()
        await db.disconnect()
        return res.status(201).json( newOrder );

    } catch (error: any) {
        await db.disconnect()
        console.log(error);
        return res.status(400).json({ message: error.message || 'Check logs on the server side'});
    }


}
