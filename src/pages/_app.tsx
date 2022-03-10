import React from 'react'
import { AppProps } from 'next/app'
import NextNProgress from "nextjs-progressbar";
import '../styles/globalStyle.css'
import '../styles/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <NextNProgress color='#86A9C7' /> <Component {...pageProps} />
  </>
}

export default MyApp;