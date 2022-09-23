import NextLink from 'next/link';

import { Typography, Grid, Chip, Link } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import { ShopLayout } from '../../components/layouts';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Full Name', width: 300 },

    {
        field: 'paid',
        headerName: 'Payment Status',
        description: 'Show information about the payment status',
        width: 200,
        renderCell: (params: GridValueGetterParams) => {
            return (
                params.row.paid
                    ? <Chip color="success" label="Paid" variant='outlined' />
                    : <Chip color="error" label="Need to pay" variant='outlined' />
            )
        }
    },
    {
        field: 'address',
        headerName: 'Shipping to',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
                <Typography>{ params.row.address }</Typography>
            )
        }
    },
    {
        field: 'orderId',
        headerName: 'Order Link',
        width: 200,
        sortable: false,
        renderCell: (params: GridValueGetterParams) => {
            return (
               <NextLink href={`/orders/${ params.row.orderId }`} passHref>
                    <Link underline='always'>
                        View order
                    </Link>
               </NextLink>
            )
        }
    },
];

interface Props {
    orders: IOrder[];
}


const HistoryPage: NextPage<Props> = ( { orders } ) => {

    const rows = orders.map( (order, index) => ({
        id: index + 1,
        paid: order.isPaid,
        fullname: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        orderId: order._id,
        address: order.shippingAddress.address
    }))


  return (
    <ShopLayout title={'Orders history'} pageDescription={'Orders history'}>
        <Typography variant='h1' component='h1'>Orders History</Typography>


        <Grid container className='fadeIn' sx={{mt: 2}}>
            <Grid item xs={12} sx={{ height:650, width: '100%' }}>
                <DataGrid 
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions={ [10] }
                />
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({req})
    // Check the session:
    if(!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false
            }
        }
    }
    const orders = await dbOrders.getOrdersByUser(session.user._id);
    return {
        props: {
            orders
        }
    }
}

export default HistoryPage