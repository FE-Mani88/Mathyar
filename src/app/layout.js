import '@/styles/globals.css'
import AosInitializer from '@/utils/AosInitializer'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Mathyar',
  icons: {
    icon: '/images/fav.png'
  }
}

export default async function RootLayout({ children }) {
  const cookieStore = cookies()
  const theme = cookieStore.get('theme')?.value || 'light'

  return (
    <html lang="fa" className={theme === 'dark' ? 'dark' : ''}>
      <body>
        <AosInitializer />
        {children}
      </body>
    </html>
  )
}
