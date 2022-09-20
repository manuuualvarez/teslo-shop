import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'

import useSWR, { SWRConfig } from 'swr'
import { AuthProvider, CartProvider, UiProvider } from '../context'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {

    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true);
    }, []);
    if (!showChild) {
        return <></>;
    }
  return (
    <SessionProvider>
      <SWRConfig 
          value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())}}
      >
          <AuthProvider>
            <CartProvider>
              <UiProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline/>
                  <Component {...pageProps}/>
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </AuthProvider>
      </SWRConfig>
    </SessionProvider>

  )
}

export default MyApp
