import type { AppProps } from 'next/app';
import '../styles/global.css';
import '../styles/layout.css';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Sidebar />
      <main className="main-content">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
