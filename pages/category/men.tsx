import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout }  from '../../components/layouts'
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';


const Men: NextPage = () => {

  const { products, isLoading, isError }  = useProducts('/products?gender=men');

  return (
    <ShopLayout title={'Teslo Shop - Men'} pageDescription={'Find the best product of TESLO for man'}>
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{mb: 1}}>Man Products</Typography>

      {
        isLoading
        ? <FullScreenLoading/>
        : <ProductList products={ products }/>
      }
    </ShopLayout>
  )
}

export default Men