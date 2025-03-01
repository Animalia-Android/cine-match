import NavBar from '@/components/NavBar';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <div className="absolute inset-0 bg-gray-900 text-white">
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}
