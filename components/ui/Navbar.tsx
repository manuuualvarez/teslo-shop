import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import React, { useContext } from 'react'
import NextLink from 'next/link'
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { UiContext } from '../../context'

export const Navbar = () => {

   const { toggleSideMenu  } = useContext(UiContext)

    const router = useRouter();

  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link display={'flex'} alignItems='center'>
                    <Typography variant='h6'>Teslo |</Typography>
                    <Typography sx={{ml: 0.5}}>Shop</Typography>
                </Link>
            </NextLink>

            <Box flex={1}/>

            <Box sx={{ display: { xs: 'none', sm: 'block'}}}>
                <NextLink href='/category/men' passHref>
                    <Link>
                        <Button color={ router.asPath === '/category/men' ? 'primary' : 'info' }>Men</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/women' passHref>
                    <Link>
                        <Button color={ router.asPath === '/category/women' ? 'primary' : 'info' }>Women</Button>
                    </Link>
                </NextLink>

                <NextLink href='/category/kids' passHref>
                    <Link>
                        <Button color={ router.asPath === '/category/kids' ? 'primary' : 'info' } >Kids</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={1}/>

            <IconButton>
                <SearchOutlined></SearchOutlined>
            </IconButton>

            <NextLink href='/cart' passHref>
                <Link>
                    <IconButton>
                        <Badge badgeContent={2} color='secondary'>
                            <ShoppingCartOutlined></ShoppingCartOutlined>
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button sx={{ml: 2}} onClick={ toggleSideMenu }>
                Menu
            </Button>

        </Toolbar>
    </AppBar>
  )
}

