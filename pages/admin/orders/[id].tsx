
import {  Box, Card, CardContent, Divider, Grid, Typography, Chip } from '@mui/material';
import { AirplaneTicketOutlined, CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material';

import { ShopLayout } from '../../../components/layouts/ShopLayout';
import { CartList, OrderSummary } from '../../../components/cart';
import { GetServerSideProps, NextPage } from 'next';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';
import { AddminLayout } from '../../../components/layouts/AdminLayout';


interface Props {
    order: IOrder
}

const OrderPage: NextPage<Props> = ({ order }) => {

    const { shippingAddress } = order;

  return (
    <AddminLayout 
        title='Resume of the order' 
        subtitle={ `Order Id: ${order._id}`}
        icon={<AirplaneTicketOutlined/>}
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
                            <Box
                                flexDirection={'column'}
                                sx={{mb: 1, display: 'flex', flex: 1,}}
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
                                        <Chip 
                                            sx={{ my: 2 }}
                                            label="Not paid"
                                            variant='filled'
                                            color="error"
                                            icon={ <CreditScoreOutlined /> }
                                        />
                                    )

                                }
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </AddminLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query;

    // Check if the order exist
    const order = await dbOrders.getOrderById(id.toString());
    if(!order) {
        return {
            redirect: {
                destination: `/admin/orders`,
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