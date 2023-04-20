// import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { AuthProvider } from '@/context/auth'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {

  return(
    <SessionProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  ) 
}
