import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { initialData } from '../../database/products';

const product = initialData.products[0];

const ProductPage = () => {
  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          {/* Slideshow TODO*/}
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display={'flex'} flexDirection={'column'}>
            {/* Titles */}
            <Typography variant='h1' component={'h1'}> { product.title }</Typography>
            <Typography variant='subtitle1' component={'h2'}> ${ product.price }</Typography>
            {/* Quantity */}
            <Box sx={{my: 2}}>
              <Typography variant='subtitle2'>Quantity</Typography>
              {/* Item Counter  TODO*/}
            </Box>
            {/* ADD Cart */}
            <Button color='secondary' className='circular-btn'>
              Add to Cart
            </Button>
            {/* Out of stock */}
            {/* <Chip label="Not available" color='error' variant='outlined'/> */}

            {/* Description */}
            <Box sx={{mt: 3}}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{ product.description }</Typography>

            </Box>

            
          </Box>
        </Grid>
      </Grid>

    </ShopLayout>
  )
}

export default ProductPage
