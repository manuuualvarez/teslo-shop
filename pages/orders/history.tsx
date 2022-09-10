import { Chip, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import NextLink from 'next/link';


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100},
    { field: 'fullname', headerName: 'Full Name', width: 300},
    { field: 'paid',
      headerName: 'Payment Status',
      description: 'Show information about the payment',
      width: 200,
      renderCell: (params) => {
        return (
            params.row.paid
            ? <Chip color='success' label="Paid Out" variant='outlined'/>
            : <Chip color='error' label="Need a Payment" variant='outlined'/>
        )
      }
    },

    { field: 'order',
    headerName: 'Order',
    description: 'Click to go to the information about the order',
    width: 200,
    sortable: false,
    renderCell: (params) => {
      return (
        <NextLink href={`/orders/${params.row.id}`} passHref>
            <Link underline='always'>
                View Order
            </Link>
        </NextLink>
      )
    },
  },
]
const rows  = [
    { id: 1, paid: true, fullname: 'Manuel Alvarez' },
    { id: 2, paid: true, fullname: 'Laura Salas' },
    { id: 3, paid: true, fullname: 'Manuel Omar Alvarez' },
    { id: 4, paid: false, fullname: 'Zulema Garnert' },
    { id: 5, paid: true, fullname: 'Juan Manuel Masset' },
    { id: 6, paid: false, fullname: 'Amalia Splendiani' },    
]


const HistoryPage = () => {
  return (
    <ShopLayout title={'Orders History'} pageDescription={'Your Orders history'}>
        <Typography variant='h1' component={'h1'}>Orders History</Typography>

        <Grid container>
            <Grid item xs={12} sx={{height: 650, width: '100%'}}>
                <DataGrid
                
                    rows={ rows }
                    columns={ columns }
                    pageSize={ 10 }
                    rowsPerPageOptions= { [10] }
                />

                
            </Grid>
        </Grid>

    </ShopLayout>
  )
}

export default HistoryPage