//import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { NavbarProvider } from '@/contexts/NavbarContext';
import { SessionProvider } from "next-auth/react"

export default function App({ Component, pageProps: { session, ...pageProps }, }) {
  return (
    <>
      <SessionProvider session={session}>
        <NavbarProvider>
          <Layout>
          </Layout>
          <br></br><br></br><br></br><br></br>
          <Component {...pageProps} />
        </NavbarProvider>
      </SessionProvider>
    </>
  );
}
