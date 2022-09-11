import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout }  from '../../components/layouts'
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';


const Women: NextPage = () => {

  const { products, isLoading, isError }  = useProducts('/products?gender=women');

  return (
    <ShopLayout title={'Teslo Shop - Woman'} pageDescription={"Find the best product of Women's"}>
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{mb: 1}}>Women's Products</Typography>

      {
        isLoading
        ? <FullScreenLoading/>
        : <ProductList products={ products }/>
      }
    </ShopLayout>
  )
}

export default Women