import { ConfirmationNumberOutlined, Rowing } from '@mui/icons-material'
import { Chip, Grid } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react'
import useSWR from 'swr';
import { AddminLayout } from '../../../components/layouts'
import { IUser } from '../../../interfaces';
import { IOrder } from '../../../interfaces/order';



const columns: GridColDef[] = [
  { field: 'id', headerName: 'Order id', width: 200 },
  { field: 'createdAt', headerName: 'Created at', width: 250, align:'center' },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'name', headerName: 'Full Name', width: 200 },
  { field: 'total', headerName: 'Total Ammount', width: 200, align: 'center' },
  { 
    field: 'isPaid', 
    headerName: 'Payment Status', 
    renderCell: ({row}: GridValueGetterParams) => {
      return row.isPaid
      ? (<Chip variant='outlined' label='Paid' color='success'/>)
      : (<Chip variant='filled' label='Not paid' color='error'/>)
    }
  },
  { field: 'quantity', headerName: 'Items', width: 100, align:'center' },
  { 
    field: 'check', 
    headerName: 'View Order', 
    renderCell: ({row}: GridValueGetterParams) => {
      return (
        <a href={`/admin/orders/${ row.id }`} target="_blank" rel='noreferrer'>
          View Order
        </a>
      )

    }
  }
];

const OrdersPage = () => {

  const { data, error } = useSWR<IOrder[]>('/api/admin/orders');

  if(!data && !error) {
    return <></>
  }

  const rows = data!.map( order => ({
    id: order._id,
    createdAt: order.createdAt,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: `$${order.total}`,
    isPaid: order.isPaid,
    quantity: order.numberOfItems,
  }))

  return (
    <AddminLayout 
        title={'Orders'} 
        subtitle={'Orders information'}
        icon={  <ConfirmationNumberOutlined/>}
    >
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

    </AddminLayout>
  )
}

export default OrdersPage
