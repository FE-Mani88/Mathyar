'use client';
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function AosInitializer() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
    });

    // اطمینان از تریگر شدن برای عناصر دیرتر لود شده
    setTimeout(() => {
      AOS.refreshHard(); // یا refresh معمولی اگر Hard زیاد باشه
    }, 800);

    // یه بار دیگه هم چند ثانیه بعد
    setTimeout(() => {
      AOS.refresh();
    }, 2000);
  }, []);

  return null;
}
