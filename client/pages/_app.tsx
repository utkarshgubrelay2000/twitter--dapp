import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { TwitterProvider } from '../context/useProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TwitterProvider >
      <Component {...pageProps} />
      <ToastContainer />
    </TwitterProvider>
  )
}

export default MyApp
