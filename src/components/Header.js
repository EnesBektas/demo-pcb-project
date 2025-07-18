'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link'; // Make sure Link is imported

// Icon for the profile dropdown
const ProfileIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: "var(--primary-blue)"}}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg> );

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    window.location.reload();
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link href="/"><Image src="/logo.png" alt="bit Elektronik Logo" width={120} height={50} className="logo"/></Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Support</a></li>
          </ul>
          <div className="nav-auth">
            {user ? (
              <div className="profile-dropdown">
                <ProfileIcon />
                <div className="dropdown-menu">
                  <span className="dropdown-item" style={{fontWeight: 'bold', color: '#555'}}>{user.email}</span>
                  <Link href="/orders" className="dropdown-item">Orders</Link>
                  {/* --- This is the updated line --- */}
                  <Link href="/offers" className="dropdown-item">Offers</Link>
                  <a href="#" className="dropdown-item">Messages</a>
                  <a href="#" onClick={handleLogout} className="dropdown-item logout">Log Out</a>
                </div>
              </div>
            ) : (
              <>
                <Link href="/login" className="login">Sign In</Link>
                <Link href="/register" className="register">Register</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};