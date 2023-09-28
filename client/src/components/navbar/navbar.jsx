import React, { useEffect, useState } from 'react'
import './navbar.css'
import {Link, useNavigate} from 'react-router-dom'
import Signin from '../signin/signIn'


export default function Navbar() {
    const [activeOption, setActiveOption] = useState('');
    const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY < 800 ) {
          setActiveOption('home');
        } else if (scrollY < 1800) {
          setActiveOption('discover');
        } else if (scrollY < 2550) {
          setActiveOption('testimonials');
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
            window.scrollTo({ top: 800, behavior: 'smooth' });
          }, 0);
        } 
        if (sectionId === 'testimonials') {
          navigate("/")
          setTimeout(() => {
            window.scrollTo({ top: 1800, behavior: 'smooth' });
          }, 0);
        } 
        if (sectionId === 'faqs') {
          navigate("/")
          setTimeout(() => {
            window.scrollTo({ top: 2550, behavior: 'smooth' });
          }, 0);
        } 
      };

      const openSignInModal = () => {
        setIsSignInModalOpen(true);
        document.body.classList.add('body-no-scroll');
      };
    
      const closeSignInModal = () => {
        setIsSignInModalOpen(false);
        document.body.classList.remove('body-no-scroll');
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
        <li className={activeOption === 'testimonials' ? 'active listItem' : 'listItem'} onClick={() => handleOptionClick('testimonials')}>Testimonials</li>
        <li className={activeOption === 'faqs' ? 'active listItem' : 'listItem'} onClick={() => handleOptionClick('faqs')}>FAQs</li>
            </ul>
        </div>
        <div className="right">
            <button className='signin' onClick={openSignInModal}>Sign in</button>
        </div>
        {isSignInModalOpen && <Signin onClose={closeSignInModal} />}
    </div>
    
  )
}
