import { AddOutlined, CategoryOutlined, ConfirmationNumberOutlined, Rowing } from '@mui/icons-material'
import { Box, Button, CardMedia, Chip, Grid, Link } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react'
import useSWR from 'swr';
import { AddminLayout } from '../../../components/layouts'

import { IProduct } from '../../../interfaces';
import NextLink from 'next/link';



const columns: GridColDef[] = [
  { 
    field: 'img', 
    headerName: 'Photo',
    renderCell: ({row}: GridValueGetterParams ) => {
        return (
            <a href={`/product/${ row.slug}`} target='_blank' rel='noreferrer'>
                <CardMedia
                    component={'img'}
                    alt={row.title}
                    className='fadeIn'
                    image={row.img}
                />
            </a>
        )
    }
},
  { 
    field: 'title', 
    headerName: 'Title', 
    width: 250, 
    renderCell: ({row}: GridValueGetterParams) => {
      return (
        <NextLink href={`/admin/products/${row.slug}`} passHref>
          <Link underline='always'>
          { row.title }
          </Link>
        </NextLink>
      )
    }
  },
  { field: 'gender', headerName: 'Genre'},
  { field: 'type', headerName: 'Type'},
  { field: 'isStock', headerName: 'Stock'},
  { field: 'price', headerName: 'Price'},
  { field: 'sizes', headerName: 'Sizes', width: 250},

];

const ProductsPage = () => {

  const { data, error } = useSWR<IProduct[]>('/api/admin/products');

  if(!data && !error) {
    return <></>
  }

  const rows = data!.map( product => ({
    id: product._id,
    img: product.images[0],
    title: product.title,
    gender: product.gender,
    type: product.type,
    isStock: product.inStock,
    price: product.price,
    sizes: product.sizes.join(', '),
    slug: product.slug

  }))

  return (
    <AddminLayout 
        title={`Products (${data?.length})`} 
        subtitle={'Products information'}
        icon={  <CategoryOutlined/>}
    >
      <Box display={'flex'} justifyContent='end' sx={{mb: 2}}>
          <Button
            startIcon={<AddOutlined/>}
            color="secondary"
            href='/admin/products/new'
          >
            Create a product
          </Button>
      </Box>

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

export default ProductsPage
