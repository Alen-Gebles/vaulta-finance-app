'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import './sidebar.css';
import Link from 'next/link';

// Link data
const links = [
  { label: 'Overview', icon: 'home', href: '/' },
  { label: 'Transactions', icon: 'transactions', href: '/path/transactions' },
  { label: 'Budgets', icon: 'budgets', href: '/path/budgets' },
  { label: 'Pots', icon: 'pot', href: '/path/pots' },
  { label: 'Recurring bills', icon: 'recurring', href: '/path/recurring-bills' }
];

const Sidebar = () => {
  const [minimize, setMinimize] = useState(false);

  useEffect(() => {
    document.body.style.paddingLeft = minimize ? '60px' : '300px';
  }, [minimize]);

  const toggleMinimize = () => setMinimize(prev => !prev);

  const [screenWidth, setScreenWidth] = useState(null);
  const [displayText, setDisplayText] = useState('');
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth <= 1024) {
      setDisplayText('hideText');
    } else {
      setDisplayText('');
    }
  }, [screenWidth]);

  

  const handleLinkClick  = (buttonId) => {
    setActiveButton(buttonId);
  };

  const sidebarClass = `sidebar ${minimize ? 'sidebar-hide' : ''}`;
  const linkClass = `sidebar-link ${minimize ? 'justify-end' : ''}`;
  const textClass = minimize ? 'hidden' : '';
  const logoClass = minimize ? 'opacity-0' : '';

  return (
    <section className={sidebarClass}>
      <h1 className={`logo ${logoClass}`}>Vaulta</h1>

      <div className='sidebar-link-box'>
        {links.map(({ label, icon, href }, index) => (
          <Link 
          href={href} 
          className={`${linkClass} ${activeButton === index ? 'activeLink' : ''}`} 
          key={index}
          onClick={() => handleLinkClick(index)}
          >
            <img className={`sidebar-link-svg ${activeButton === index ? 'active-sidebar-svg' : ''}`} src={`/${icon}.svg`} alt={icon} />
            <p className={`${textClass} ${displayText}`}>{label}</p>
          </Link>
        ))}
      </div>

      <button className={` ${displayText} sidebar-link minimize-menu-link ${minimize ? 'justify-end pr-5' : ''}`} onClick={toggleMinimize}>
        <svg className={`sidebar-link-svg ${minimize ? 'rotateSidebarLink' : ''}`} width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 4V20M8 12H20M8 12L12 8M8 12L12 16" stroke="#696868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p className={`${textClass}`}>Minimize Menu</p>
      </button>
    </section>
  );
};

export default Sidebar;
