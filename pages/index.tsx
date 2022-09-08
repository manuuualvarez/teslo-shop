import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout }  from '../components/layouts'

const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo Shop - Home'} pageDescription={'Find the best product of TESLO'}>
      <Typography variant='h1' component='h1'>Shop</Typography>
      <Typography variant='h2' sx={{mb: 1}}>All Products</Typography>

    </ShopLayout>
  )
}

export default Home
