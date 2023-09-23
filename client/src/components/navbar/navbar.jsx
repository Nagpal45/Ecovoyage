import React from 'react'
import './navbar.css'


export default function Navbar() {
  return (
    <div className='navbar'>
        <div className='left'>
            <div className='logo'>
            <span className='logo'>EcoVoyage</span>
            </div>
        </div>
        <div className="center">
            <ul className='list'>
                <li className='listItem'>Home</li>
                <li className='listItem'>Discover</li>
                <li className='listItem'>About</li>
                <li className='listItem'>FAQs</li>
            </ul>
        </div>
        <div className="right">
            <button className='signin'>Sign In</button>
        </div>
    </div>
  )
}
