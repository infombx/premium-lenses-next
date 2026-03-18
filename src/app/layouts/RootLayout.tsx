import { Outlet } from 'react-router';
import { Header } from '../components/homepage/Header';
import { Footer } from '../components/homepage/Footer';
import { CartProvider } from '../context/CartContext';

export function RootLayout() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </CartProvider>
  );
}