import { FC } from 'react';
import { SideMenu } from '../ui';
import { AdminNavbar } from '../admin';
import { Box, Grid, Typography } from '@mui/material';


interface Props {
    title: string;
    subtitle: string;
    icon?: JSX.Element;
}

export const AddminLayout:FC<Props> = ({ children, title, subtitle, icon }) => {
  return (
    <>
        <nav>
            <AdminNavbar/>
        </nav>

        <SideMenu />

        <main style={{
            margin: '80px auto',
            maxWidth: '1440px',
            padding: '0px 30px'
        }}>

            <Box display={'flex'} flexDirection='column'>
                <Typography variant='h1' component={'h1'}>
                    { icon }
                    { title }
                </Typography>
                <Typography variant='h2' sx={{mb: 2, mt: 2}}>{ subtitle }</Typography>

                <Box className='fadeIn'>
                    
                    { children }
        
                </Box>

            </Box>
        </main>
    </>
  )
}



