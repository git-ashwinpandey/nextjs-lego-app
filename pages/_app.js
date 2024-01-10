//import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { NavbarProvider } from '@/contexts/NavbarContext';

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavbarProvider>
        <Layout>
        </Layout>
        <br></br><br></br><br></br><br></br>
        <Component {...pageProps} />
      </NavbarProvider>
    </>
  );
}
