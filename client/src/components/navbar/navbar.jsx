import React, { useEffect, useState } from 'react'
import './navbar.css'

export default function Navbar() {
    const [activeOption, setActiveOption] = useState('home');

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY < 600 ) {
          setActiveOption('home');
        } else if (scrollY < 1300) {
          setActiveOption('discover');
        } else if (scrollY < 1900) {
          setActiveOption('about');
        } else {
          setActiveOption('faqs');
        }
      };

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    
      const handleOptionClick = (sectionId) => {
        if (sectionId === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } 
        if (sectionId === 'discover') {
          window.scrollTo({ top: 670, behavior: 'smooth' });
        } 
        if (sectionId === 'about') {
          window.scrollTo({ top: 1347, behavior: 'smooth' });
        } 
        if (sectionId === 'faqs') {
          window.scrollTo({ top: 2080, behavior: 'smooth' });
        } 
      };


  return (
    <div className='navbar'>
        <div className='left'>
            <div className='logo'>
            <span className='logo'>EcoVoyage</span>
            </div>
        </div>
        <div className="center">
            <ul className='list'>
            
        <li className={activeOption === 'home' ? 'active listItem' : 'listItem'} onClick={() => handleOptionClick('home')}>
          Home
        </li>

        <li className={activeOption === 'discover' ? 'active listItem' : 'listItem'} onClick={() => handleOptionClick('discover')}>Discover</li>
        <li className={activeOption === 'about' ? 'active listItem' : 'listItem'} onClick={() => handleOptionClick('about')}>About Us</li>
        <li className={activeOption === 'faqs' ? 'active listItem' : 'listItem'} onClick={() => handleOptionClick('faqs')}>FAQs</li>
            </ul>
        </div>
        <div className="right">
            <button className='signin'>Sign in</button>
        </div>
    </div>
    
  )
}
