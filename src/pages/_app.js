import NavBar from '@/components/NavBar';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}
