import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductSlideshow } from '../../components/products';
import 'react-slideshow-image/dist/styles.css'
import { ItemCounter } from '../../components/ui';
import { SizeSelector } from '../../components/products';
import { IProduct } from '../../interfaces';
import { NextPage, GetServerSideProps } from 'next';
import { dbProduct } from '../../database';


interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout title={ product.title } pageDescription={ product.description }>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow  images={product.images}/>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display={'flex'} flexDirection={'column'}>
            {/* Titles */}
            <Typography variant='h1' component={'h1'}> { product.title }</Typography>
            <Typography variant='subtitle1' component={'h2'}> ${ product.price }</Typography>
            
            {/* Quantity */}
            <Box sx={{my: 2}}>
              <Typography variant='subtitle2'>Quantity</Typography>
              <ItemCounter/>
              <SizeSelector 
                // selectedSize={product.sizes[0]} 
                sizes={ product.sizes}
              />
              
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


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug = ''} = params as { slug: string };
  const product = await dbProduct.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}

export default ProductPage
