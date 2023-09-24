import React, { useEffect, useState } from 'react'
import './navbar.css'
import {Link, useNavigate} from 'react-router-dom'

export default function Navbar() {
    const [activeOption, setActiveOption] = useState('');
    const navigate = useNavigate();

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
          navigate("/")
          setTimeout(() => {
            window.scrollTo({ top: 1, behavior: 'smooth' });
          }, 0);
        } 
        if (sectionId === 'discover') {
          navigate("/")
          setTimeout(() => {
            window.scrollTo({ top: 670, behavior: 'smooth' });
          }, 0);
        } 
        if (sectionId === 'about') {
          navigate("/")
          setTimeout(() => {
            window.scrollTo({ top: 1347, behavior: 'smooth' });
          }, 0);
        } 
        if (sectionId === 'faqs') {
          navigate("/")
          setTimeout(() => {
            window.scrollTo({ top: 2080, behavior: 'smooth' });
          }, 0);
        } 
      };


  return (
    <div className='navbar'>
        <div className='left'>
          <Link to='/'>
            <div className='logo'>
            <img src="/images/logo.png" alt="logo" className='logoimg'/>
            <span className='boldlogo'>Eco</span>
            <span className='logosimple'>Voyage</span>
            </div>
          </Link>
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
