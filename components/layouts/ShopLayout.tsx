import Head from 'next/head'
import React, { FC } from 'react'
import { Navbar } from '../ui';

interface Props {
    title: string;
    pageDescription: string;
    imgFullURL?: string;
    children?: React.ReactNode | undefined
}

export const ShopLayout: FC<Props> = ({ children, pageDescription, title, imgFullURL }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>
            <meta name='description' content={ pageDescription}/>
            <meta name='og:title' content={ title }/>
            <meta name='og:description' content={ pageDescription }/>

            {
                imgFullURL && (
                    <meta name='og:image' content={ imgFullURL }/>
                )
            }
        </Head>

        <nav>
            <Navbar></Navbar>
        </nav>

        {/* SideBar */}

        <main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px'}}>
            { children }
        </main>

        <footer>
            {/* Custom footer */}
        </footer>
    </>
  )
}


