import Navbar from '@/components/modules/Navbar/Navbar'
import Footer from '@/components/templates/Index/Footer/Footer';
import Main from '@/components/templates/Index/Main/Main';
import { authUser } from '@/utils/serverheplers';

export default async function Home() {

  const user = await authUser()

  return (
    <>
      <div className="dir cnplf" data-aos-easing="ease-out-cubic" data-aos-duration="500" data-aos-delay="0">
        <div className="chip0 cbk2v cuk8q clv5h cz8nf c9loe cum4w cwh80 transition-all duration-100 bg-slate-50 dark:!bg-gray-900">
          <Navbar isUserRegistered={user ? true : false} user={JSON.parse(JSON.stringify(user))} />
          <Main />
          <Footer />
        </div>
      </div>
    </>
  );
}


export const metadata = {
  title: 'Mathyar | Home',
  icons: {
    icon: '/images/fav.png'
  }
}