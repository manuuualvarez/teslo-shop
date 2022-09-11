import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout }  from '../components/layouts'
import { ProductList } from '../components/products';
import { FullScreenLoading } from '../components/ui';
import { useProducts } from '../hooks';


const Home: NextPage = () => {

  const { products, isLoading, isError }  = useProducts('/products');

  return (
    <ShopLayout title={'Teslo Shop - Home'} pageDescription={'Find the best product of TESLO'}>
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{mb: 1}}>All Products</Typography>

      {
        isLoading
        ? <FullScreenLoading/>
        : <ProductList products={ products }/>
      }
    </ShopLayout>
  )
}

export default Home
