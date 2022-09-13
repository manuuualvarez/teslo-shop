import { Box, Typography } from '@mui/material'
import { color } from '@mui/system';
import type { NextPage, GetServerSideProps } from 'next'
import { ShopLayout }  from '../../components/layouts'
import { ProductList } from '../../components/products';
import { db, dbProduct } from '../../database';
import { IProduct } from '../../interfaces/products';

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}


const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout title={'Teslo Shop - Search'} pageDescription={'Find the best product of TESLO'}>
      <Typography variant='h1' component='h1'>Searching Products</Typography>
      {
        foundProducts
        ? <Typography variant='h2' sx={{mb: 1}} textTransform="capitalize">{ products.length} items found with "{ query }"</Typography>
        : (
          <Box display={'flex'}>
            <Typography variant='h2' sx={{mb: 2, ml: 0.5, mt: 2}}>Not found items with</Typography>
            <Typography variant='h2' sx={{mb: 2, ml: 0.5, mt: 2}} color="secondary" textTransform="capitalize">"{ query }"</Typography>
          </Box>
        )
      }
      <ProductList products={ products }/>
    </ShopLayout>
  )
}
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = '' } = params as { query: string }
  
  if (query.length === 0 ) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProduct.getProductsBySearch(query);

  const foundProducts = products.length > 0;
  
  if (!foundProducts) {
    products = await await dbProduct.getProductsBySearch('shirts');
  }

  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}

export default SearchPage
