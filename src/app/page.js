'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

// --- Icon Components (some are new) ---
const UploadIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ccc' }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg> );
const FeatureIcon1 = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--primary-blue)"}}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> );
const FeatureIcon2 = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--primary-blue)"}}><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> );
const FeatureIcon3 = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--primary-blue)"}}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> );
const ProfileIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--primary-blue)"}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );
const ChatIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--primary-blue)"}}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg> );
const EmailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--primary-blue)"}}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> );
const PhoneIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--primary-blue)"}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> );


// --- MAIN PAGE COMPONENT ---
export default function MainPage() {
  const [activeLayer, setActiveLayer] = useState(2);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    setIsLoggedIn(!!user);
  }, []);

  const handleInstantQuoteClick = () => {
    if (isLoggedIn) {
      router.push('/quote-specifications'); 
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <main>
        <section className="hero-v2">
          {/* 1. Text Content at the Top */}


          {/* 2. Slider in the Middle */}
          <div className="hero-slider-container">
            <Swiper
                modules={[Autoplay, Pagination]}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
            >
                <SwiperSlide className="hero-slide" style={{ backgroundImage: `url(/images/slider-1.jpg)` }}></SwiperSlide>
                <SwiperSlide className="hero-slide" style={{ backgroundImage: `url(/images/slider-2.jpg)` }}></SwiperSlide>
                <SwiperSlide className="hero-slide" style={{ backgroundImage: `url(/images/slider-3.jpg)` }}></SwiperSlide>
                <SwiperSlide className="hero-slide" style={{ backgroundImage: `url(/images/slider-4.jpg)` }}></SwiperSlide>

            </Swiper>
          </div>
        </section>

        {/* 3. Horizontal Quote Form at the Bottom */}
        <div className="quote-form-horizontal-container">
            <div className="quote-form-horizontal">
                <div className="file-upload-area">
                    <UploadIcon />
                    <span>Add Gerber File</span>
                </div>
                <div className="form-group layer-options">
                    <label>Layers</label>
                    <div className="layer-options">
                        {[1, 2, 4, 6].map(layer => (<button key={layer} type="button" className={activeLayer === layer ? 'active' : ''} onClick={() => setActiveLayer(layer)}>{layer}</button>))}
                    </div>
                </div>
                <div className="form-group">
                    <label>Dimensions (mm)</label>
                    <div className="dimensions-group">
                        <input type="text" placeholder="100" />
                        <input type="text" placeholder="100" />
                    </div>
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <select defaultValue="5">
                        <option>5</option><option>10</option><option>20</option><option>50</option><option>100</option>
                    </select>
                </div>
                <button type="button" className="quote-button" onClick={handleInstantQuoteClick}>Instant Quote</button>
            </div>
        </div>

        <section className="features"><div className="container"><h2>Why Choose Bit Elektronik?</h2><div className="features-grid"><div className="feature-item"><FeatureIcon1 /><h3>Fast Turnaround</h3><p>Get your prototypes manufactured and delivered in record time.</p></div><div className="feature-item"><FeatureIcon2 /><h3>Competitive Pricing</h3><p>High-quality PCBs at prices that fit your budget.</p></div><div className="feature-item"><FeatureIcon3 /><h3>Premium Quality</h3><p>We use top-grade materials to ensure performance and reliability.</p></div></div></div></section>
        
        {/* --- NEW CONTACT SECTION --- */}
        <section className="contact-section-container">
            <div className="contact-grid">
                <div className="contact-item">
                    <ChatIcon />
                    <h3>Chat with Us</h3>
                    <a href="#">Online chat </a>
                    <p>Mon-Fri: 24 hours, Sat: 9am-6pm, GMT+8</p>
                </div>
                <div className="contact-item">
                    <EmailIcon />
                    <h3>Email Us</h3>
                    <a href="mailto:support@bitelektronik.com">support@bitelektronik.com</a>
                    <p>24 hours online</p>
                </div>
                <div className="contact-item">
                    <PhoneIcon />
                    <h3>Call Us</h3>
                    <a href="tel:+1234567890">+1 (234) 567-890</a>
                    <p>Mon-Fri: 24 hours, Sat: 9am-6pm, GMT+8</p>
                </div>
            </div>
        </section>
      </main>
    </>
  );
}