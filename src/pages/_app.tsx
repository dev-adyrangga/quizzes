import '@/styles/globals.css'
import NavBar from '@/components/nav-bar'
import AppProvider from '@/providers/app-provider'
import type { AppProps } from 'next/app'
import useAppRouter from '@/hooks/use-app-router'
import Head from 'next/head'

export default function App({ Component, pageProps = {} }: AppProps) {
  const { locale } = useAppRouter()
  return (
    <>
      <Head>
        <title>Quizzes | Ady</title>
        <meta name="description" content="Quizzes | Ady" />
      </Head>
      <AppProvider locale={locale}>
        <NavBar pageSlug={pageProps?.pageSlug} />
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}
