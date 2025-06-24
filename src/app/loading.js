import React from 'react'

export default function loading() {
  return (
    <div className={`loading-container !bg-[#1a2331] h-[100vh] flex justify-center items-center ${true ? 'loading' : ''}`}>
      <div className="c5sfa c307p c1sv4 cavhb cnmzr !hidden md:!flex" aria-hidden="true">
        <img src="https://preview.cruip.com/neon/images/hero-illustration.svg" className="cy2lr" width={2143} height={737} alt="Hero Illustration" style={{ maxHeight: '100vh', objectFit: 'cover' }} />
      </div>
      <div className="loader"></div>
    </div>
  );
}

