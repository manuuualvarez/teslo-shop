import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Order, Product, User } from '../../../models';

type Data = {
    numberOfOrders: number;
    paidOrders: number; // is Paid in true
    numbersOfClients: number; //Only clients
    numberOfProducts: number;
    productsWithOutOffStock: number; // 0 items
    productsWithLowStock: number; // until 10 items
    notPaidOrders: number;

}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {


    await db.connect();
    const [
        numberOfOrders,
        paidOrders,
        numbersOfClients,
        numberOfProducts,
        productsWithOutOffStock,
        productsWithLowStock

    ] = await Promise.all([
        Order.count(),
        Order.find({isPaid: true}).count(),
        User.find({role: 'client'}).count(),
        Product.count(),
        Product.find({inStock: 0}).count(),
        Product.find({inStock: { $lte: 10 }}).count(),

    ])

    await db.disconnect();

    res.status(200).json({ 
        numberOfOrders,
        paidOrders,
        numbersOfClients,
        numberOfProducts,
        productsWithOutOffStock,
        productsWithLowStock,
        notPaidOrders: numberOfOrders - paidOrders
    })
}