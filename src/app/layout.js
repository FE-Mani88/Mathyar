import '@/styles/globals.css';
import AosInitializer from '@/utils/AosInitializer';

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body>
        <AosInitializer />
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Mathyar',
  icons: {
    icon: '/images/fav.png'
  }
}