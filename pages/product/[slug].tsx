import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductSlideshow } from '../../components/products';
import 'react-slideshow-image/dist/styles.css'
import { ItemCounter } from '../../components/ui';
import { SizeSelector } from '../../components/products';
import { IProduct, ICartProduct, ISize } from '../../interfaces';
import { NextPage, GetStaticPaths, GetStaticProps } from 'next';
import { dbProduct } from '../../database';
import { useRouter } from 'next/router';
import { CartContext } from '../../context/cart/CartContext';



interface Props {
  product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

  const router = useRouter();

  const { addProductToCart } = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id, 
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1
  })

  const onSelectedSize = (size: ISize) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct( currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const onAddProduct = () => {
    
    if (!tempCartProduct.size) return;
    addProductToCart(tempCartProduct);
    // router.push('/cart');
  }

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
              <Typography variant='subtitle2'>Quantity (max. {product.inStock})</Typography>
              {/* Counter */}
              <ItemCounter
                currentValue={ tempCartProduct.quantity }
                updateQuantity = { onUpdateQuantity }
                maxValue = { product.inStock }
              />
              {/* Size */}
              <SizeSelector 
                selectedSize={ tempCartProduct.size } 
                sizes={ product.sizes}
                onSelectedSize={ onSelectedSize }
              /> 
            </Box>
            {/* ADD Cart */}
            {
              (product.inStock > 0)
              ? (
                <Button 
                  color='secondary' 
                  className='circular-btn' 
                  onClick={ onAddProduct }
                >
                   {
                    tempCartProduct.size ? 'Add to cart' : 'Please select a SIZE'
                   }
                </Button>
              ):(
                // Out of stock 
                <Chip label="Not available" color='error' variant='outlined'/>
              )
            }
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

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const  productSlugs = await dbProduct.getAllProductsBySlug();

  return {
    paths: productSlugs.map( ({ slug }) => ({
      params: {
        slug
      }
    })),
    fallback: "blocking"
  }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = '' } = params as { slug: string };
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
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductPage
