import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout }  from '../../components/layouts'
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';


const Kid: NextPage = () => {

  const { products, isLoading, isError }  = useProducts('/products?gender=kid');

  return (
    <ShopLayout title={'Teslo Shop - Kids'} pageDescription={'Find the best product of TESLO for Kids'}>
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{mb: 1}}>Children's Products</Typography>

      {
        isLoading
        ? <FullScreenLoading/>
        : <ProductList products={ products }/>
      }
    </ShopLayout>
  )
}

export default Kid