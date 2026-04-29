'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react'; // Using lucide for icons

export default function Navbar({ companyInfo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Fitur', href: '/features' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Berita', href: '/berita' },
    { name: 'Tentang Kami', href: '/about' },
    { name: 'Hubungi Kami', href: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-psd-green shadow-lg py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src="/logo.png" alt="PSD Logo" className="h-12 md:h-16 w-auto transition-all" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-sm font-medium text-white">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-psd-yellow transition">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(true)} className="text-white focus:outline-none">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          {/* Social Icons */}
          <div className="hidden md:flex space-x-4 text-white">
            <a href={companyInfo?.instagram_url || "https://instagram.com"} className="hover:text-psd-yellow transition text-xl" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href={companyInfo?.facebook_url || "https://facebook.com"} className="hover:text-psd-yellow transition text-xl" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href={companyInfo?.tiktok_url || "https://tiktok.com"} className="hover:text-psd-yellow transition text-xl" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>
      
      <div className={`fixed top-0 right-0 w-3/4 max-w-[300px] h-full bg-[#0A5C4F] z-[70] transform transition-transform duration-300 md:hidden shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-10">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-psd-yellow p-2" aria-label="Close Menu">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-col space-y-6 text-xl font-medium text-white">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-psd-yellow transition">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
