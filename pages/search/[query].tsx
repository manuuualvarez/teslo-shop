import { Typography } from '@mui/material'
import type { NextPage, GetServerSideProps } from 'next'
import { ShopLayout }  from '../../components/layouts'
import { ProductList } from '../../components/products';
import { dbProduct } from '../../database';
import { IProduct } from '../../interfaces/products';

interface Props {
  products: IProduct[];
}


const SearchPage: NextPage<Props> = ({ products }) => {

  // const { products, isLoading, isError }  = useProducts('/products');

  return (
    <ShopLayout title={'Teslo Shop - Search'} pageDescription={'Find the best product of TESLO'}>
      <Typography variant='h1' component='h1'>Searching Products</Typography>
      <Typography variant='h2' sx={{mb: 1}}>LALALLALAL</Typography>

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

  // TODO: if products its empty, return some products

  return {
    props: {
      products
    }
  }
}

export default SearchPage
