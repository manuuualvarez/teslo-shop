
import {  Box, Card, CardContent, Divider, Grid, Typography, Chip, CircularProgress } from '@mui/material';
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../components/cart';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

import {  PayPalButtons } from "@paypal/react-paypal-js";
import { tesloApi } from '../../api';
import { useRouter } from 'next/router';
import { useState } from 'react';


interface Props {
    order: IOrder
}

export type OrderResponseBody = {
    id: string;
    status:
    | "COMPLETED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "PAYER_ACTION_REQUIRED";
}


const OrderPage: NextPage<Props> = ({ order }) => {

    const router = useRouter();
    const [isPaying, setisPaying] = useState(false);

    const { shippingAddress } = order;


    const onOrderCompleted = async ( details: OrderResponseBody ) => {
        
        if(details.status !== 'COMPLETED') {
            return alert("We can get the payment")
        }

        setisPaying(true);

        try {
            const { data } = await tesloApi.post(`/orders/pay`, {
                transactionId: details.id,
                orderId: order._id
            });

            router.reload();
        } catch (error) {
            setisPaying(false);
            alert("Error")
        }
    }

  return (
    <ShopLayout title='Resume of the order' pageDescription={'Summary of the order'}>
        <Typography variant='h1' component='h1'>Order: {order._id}</Typography>

        {
            order.isPaid 
            ? (
                <Chip 
                    sx={{ my: 2 }}
                    label="It was paid"
                    variant='outlined'
                    color="success"
                    icon={ <CreditScoreOutlined /> }
                />

            )
            : (
                <Chip 
                    sx={{ my: 2 }}
                    label="Waiting for payment"
                    variant='outlined'
                    color="error"
                    icon={ <CreditCardOffOutlined /> }
                />

            )
        }
        <Grid container className='fadeIn'>
            <Grid item xs={ 12 } sm={ 7 }>
                <CartList products={ order.orderItems }/>
            </Grid>
            <Grid item xs={ 12 } sm={ 5 }>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resume ({ order.numberOfItems} { order.numberOfItems > 1 ? 'items' : 'item'})</Typography>
                        <Divider sx={{ my:1 }} />

                        <Box display='flex' justifyContent='space-between'>
                            <Typography variant='subtitle1'>Dropp Off</Typography>
                        </Box>

                        
                        <Typography>{ shippingAddress.firstName } { shippingAddress.lastName }</Typography>
                        <Typography>{ shippingAddress.address }{ shippingAddress.address2 ? `, ${ shippingAddress.address2}`: ''}  </Typography>
                        <Typography> {shippingAddress.city } - { shippingAddress.country }</Typography>
                        <Typography> { shippingAddress.zip } </Typography>
                        <Typography>{ shippingAddress.phone  }</Typography>

                        <Divider sx={{ my:1 }} />

                        <OrderSummary orderValues={{ 
                                    numberOfItems: order.numberOfItems,
                                    subTotal: order.subTotal,
                                    total: order.total,
                                    tax: order.tax,
                        }}/>

                        <Box sx={{ mt: 3 }} display="flex" flexDirection={'column'}>
                            {/* Payment loader */}
                            <Box 
                                display={'flex'} 
                                justifyContent="center" 
                                className='fadeIn' 
                                sx={{mb: 1, display: isPaying ? 'flex' : 'none'}}
                            >
                                <CircularProgress/>
                            </Box>
                            {/* Payment Call To Actions */}
                            <Box
                                flexDirection={'column'}
                                sx={{mb: 1, display: isPaying ? 'none' : 'flex', flex: 1,}}
                            >
                                {
                                    order.isPaid
                                    ? (
                                        <Chip 
                                            sx={{ my: 2 }}
                                            label="It was paid"
                                            variant='outlined'
                                            color="success"
                                            icon={ <CreditScoreOutlined /> }
                                        />

                                    ): (
                                        // Paypal btn
                                        <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: `${order.total}`,
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={(data, actions) => {
                                                return actions.order!.capture().then((details) => {
                                                    onOrderCompleted(details);
                                                });
                                            }}
                                        />
                                    )

                                }
                            </Box>
                        </Box>

                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;
    const session: any = await getSession({ req })
    // Check the user session
    if(!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }
        }
    }
    // Check if the order exist
    const order = await dbOrders.getOrderById(id.toString());
    if(!order) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    // Check if the user is the owner of the id
    if(order.user !== session.user._id) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false,
            }
        }
    }

    return {
        props: {
            order
        }
    }
}

export default OrderPage;