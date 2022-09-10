import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import { ShopLayout } from "../../components/layouts"
import NextLink from 'next/link';


const EmptyPage = () => {
  return (
    <ShopLayout title="Empty cart" pageDescription="Not items in cart">
        <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)' 
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >

            <RemoveShoppingCartOutlined sx={{fontSize: 100}}/>

            <Box display={'flex'} flexDirection={'column'} alignItems='center'>
                <Typography variant='h1' component={'h1'} fontSize={50} fontWeight={200}>| Cart has not items</Typography>
                <NextLink href={'/'} passHref>
                    <Link typography={'h4'} color='secondary'>
                        Click here and Go Back
                    </Link>
                </NextLink>

            </Box>


        </Box>

    </ShopLayout>
  )
}

export default EmptyPage
