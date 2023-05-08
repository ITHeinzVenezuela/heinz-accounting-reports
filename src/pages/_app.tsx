import type { AppProps } from 'next/app'

import '../../node_modules/tailwindcss/tailwind.css'
import "@/styles/App.scss"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
