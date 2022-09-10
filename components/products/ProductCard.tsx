import React, { FC, useMemo, useState } from 'react'
import { Card, Grid, CardActionArea, CardMedia, Box, Typography, Link } from '@mui/material';
import { IProduct } from '../../interfaces';
import NextLink from 'next/link';


interface Props {
    product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {
    const [isHovered, setIsHovered] = useState(false);
    const productImage = useMemo(() =>  {
        return isHovered
            ? `products/${product.images[1]}`
            : `products/${product.images[0]}`

    }, [isHovered, product.images]);

  return (
    <Grid 
        item xs={6} 
        sm={4}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
        <Card>
            <CardActionArea>
                <NextLink href='/product/slug' passHref prefetch={false}>
                    <Link>
                        <CardMedia
                            component='img'
                            className='fadeIn'
                            image={productImage}
                            alt={product.title}
                        >

                        </CardMedia>
                    </Link>
                </NextLink>
            </CardActionArea>

            <Box sx={{mt: 1}} className='fadeIn'>
                <Typography fontWeight={700}>{ product.title }</Typography>
                <Typography fontWeight={500}> ${ product.price }</Typography>
            </Box>
        </Card>
    </Grid>
  )
}
