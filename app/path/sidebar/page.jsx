'use client';

import React, { useState, useEffect } from 'react';
import './sidebar.css';
import Link from 'next/link';

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
    if (screenWidth <= 1324) {
      setDisplayText('hideText');
    } else {
      setDisplayText('');
    }
  }, [screenWidth]);

  

  const handleLinkClick  = (buttonId) => {
    setActiveButton(buttonId);
  };

  const sidebarClass = `sidebar ${minimize ? 'sidebar-hide' : ''}`;
  const linkClass = `sidebar-link ${minimize ? 'minimizedSidebar' : ''}`;
  const textClass = minimize ? 'hidden' : '';
  const logoClass = minimize ? 'opacity-0' : '';
  const minimizedBar = minimize ? 'minimizedBox' : '';

  // Link data
const links = [
  { label: 'Overview', href: '/',
    icon: (activeButton, index) => (<svg className={`sidebar-link-svg ${activeButton === index ? 'active-sidebar-svg' : ''}`} width="auto" height="auto" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.3861 1.21065C11.7472 0.929784 12.2528 0.929784 12.6139 1.21065L21.6139 8.21065C21.8575 8.4001 22 8.69141 22 9V20.5C22 21.3284 21.3284 22 20.5 22H15V14C15 13.4477 14.5523 13 14 13H10C9.44772 13 9 13.4477 9 14V22H3.5C2.67157 22 2 21.3284 2 20.5V9C2 8.69141 2.14247 8.4001 2.38606 8.21065L11.3861 1.21065Z" fill="#ffffff"></path> </g></svg>), 
  },
  { label: 'Transactions', href: '/path/transactions',
    icon: (activeButton, index) => (<svg className={`sidebar-link-svg ${activeButton === index ? 'active-sidebar-svg' : ''}`} fill="#ffffff" width="auto" height="auto" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" transform="rotate(270)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.0020048,13 C17.5542895,13 18.0020048,13.4477153 18.0020048,14 C18.0020048,14.5128358 17.6159646,14.9355072 17.1186259,14.9932723 L17.0020048,15 L5.41700475,15 L8.70911154,18.2928932 C9.0695955,18.6533772 9.09732503,19.2206082 8.79230014,19.6128994 L8.70911154,19.7071068 C8.34862757,20.0675907 7.78139652,20.0953203 7.38910531,19.7902954 L7.29489797,19.7071068 L2.29489797,14.7071068 C1.69232289,14.1045317 2.07433707,13.0928192 2.88837381,13.0059833 L3.00200475,13 L17.0020048,13 Z M16.6128994,4.20970461 L16.7071068,4.29289322 L21.7071068,9.29289322 C22.3096819,9.8954683 21.9276677,10.9071808 21.1136309,10.9940167 L21,11 L7,11 C6.44771525,11 6,10.5522847 6,10 C6,9.48716416 6.38604019,9.06449284 6.88337887,9.00672773 L7,9 L18.585,9 L15.2928932,5.70710678 C14.9324093,5.34662282 14.9046797,4.77939176 15.2097046,4.38710056 L15.2928932,4.29289322 C15.6533772,3.93240926 16.2206082,3.90467972 16.6128994,4.20970461 Z"></path> </g></svg>),
  },
  { label: 'Budgets', href: '/path/budgets',
    icon: (activeButton, index) => (<svg className={`sidebar-link-svg ${activeButton === index ? 'active-sidebar-svg' : ''}`} fill="#ffffff" height="auto" width="auto" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M276.211,0.792v163.086c19.389,4.236,36.553,14.415,49.463,28.559l141.237-81.543 C424.329,49.121,355.325,6.971,276.211,0.792z"></path> </g> </g> <g> <g> <path d="M487.159,145.878L345.9,227.434c2.86,9.011,4.415,18.604,4.415,28.566c0,45.15-31.733,82.869-74.108,92.122v163.085 C408.145,500.904,512,390.583,512,256C512,216.573,503.079,179.234,487.159,145.878z"></path> </g> </g> <g> <g> <path d="M235.789,163.878V0.792C103.854,11.097,0,121.418,0,256c0,134.581,103.852,244.902,235.787,255.208V348.121 c-42.372-9.255-74.103-46.972-74.103-92.121C161.684,210.85,193.416,173.133,235.789,163.878z"></path> </g> </g> </g></svg>),
  },
  { label: 'Pots', href: '/path/pots',
    icon: (activeButton, index) => (<svg className={`sidebar-link-svg ${activeButton === index ? 'active-sidebar-svg' : ''}`} fill="none" height="auto" viewBox="0 0 28 36" width="auto" xmlns="http://www.w3.org/2000/svg"><path d="m22.4375 5.8875v-2.8875c0-.58016-.2305-1.13656-.6407-1.5468-.4102-.41023-.9666-.6407-1.5468-.6407h-12.5c-.58016 0-1.13656.23047-1.5468.6407-.41023.41024-.6407.96664-.6407 1.5468v2.8875c-1.39375.22446-2.66214.93755-3.57823 2.01165-.91608 1.07411-1.420065 2.43915-1.42177 3.85085v17.5c0 1.5747.62556 3.0849 1.73905 4.1984 1.1135 1.1135 2.62373 1.7391 4.19845 1.7391h15c1.5747 0 3.0849-.6256 4.1984-1.7391s1.7391-2.6237 1.7391-4.1984v-17.5c-.0017-1.4117-.5057-2.77674-1.4218-3.85085-.9161-1.0741-2.1845-1.78719-3.5782-2.01165zm-1.875-2.8875v2.8125h-3.125v-3.125h2.8125c.0829 0 .1624.03292.221.09153.0586.0586.0915.13809.0915.22097zm-8.125 2.8125v-3.125h3.125v3.125zm-4.6875-3.125h2.8125v3.125h-3.125v-2.8125c0-.08288.03292-.16237.09153-.22097.0586-.05861.13809-.09153.22097-.09153zm17.8125 26.5625c0 .5335-.1051 1.0618-.3092 1.5547-.2042.4928-.5034.9407-.8807 1.3179-.3772.3773-.8251.6765-1.3179.8807-.4929.2041-1.0212.3092-1.5547.3092h-15c-.53349 0-1.06177-.1051-1.55465-.3092-.49289-.2042-.94073-.5034-1.31797-.8807-.37724-.3772-.67648-.8251-.88064-1.3179-.20416-.4929-.30924-1.0212-.30924-1.5547v-17.5c0-1.0774.42801-2.11075 1.18988-2.87262s1.79518-1.18988 2.87262-1.18988h15c1.0774 0 2.1108.42801 2.8726 1.18988.7619.76187 1.1899 1.79522 1.1899 2.87262zm-6.875-6.25c0 .9117-.3622 1.786-1.0068 2.4307-.6447.6446-1.519 1.0068-2.4307 1.0068h-.3125v1.5625c0 .2486-.0988.4871-.2746.6629s-.4143.2746-.6629.2746-.4871-.0988-.6629-.2746-.2746-.4143-.2746-.6629v-1.5625h-1.5625c-.2486 0-.4871-.0988-.6629-.2746s-.2746-.4143-.2746-.6629.0988-.4871.2746-.6629.4143-.2746.6629-.2746h3.75c.4144 0 .8118-.1646 1.1049-.4576.293-.2931.4576-.6905.4576-1.1049s-.1646-.8118-.4576-1.1049c-.2931-.293-.6905-.4576-1.1049-.4576h-2.5c-.9117 0-1.786-.3622-2.4307-1.0068-.64464-.6447-1.0068-1.519-1.0068-2.4307s.36216-1.786 1.0068-2.4307c.6447-.6446 1.519-1.0068 2.4307-1.0068h.3125v-1.5625c0-.2486.0988-.4871.2746-.6629s.4143-.2746.6629-.2746.4871.0988.6629.2746.2746.4143.2746.6629v1.5625h1.5625c.2486 0 .4871.0988.6629.2746s.2746.4143.2746.6629-.0988.4871-.2746.6629-.4143.2746-.6629.2746h-3.75c-.4144 0-.8118.1646-1.1049.4576-.293.2931-.4576.6905-.4576 1.1049s.1646.8118.4576 1.1049c.2931.293.6905.4576 1.1049.4576h2.5c.9117 0 1.786.3622 2.4307 1.0068.6446.6447 1.0068 1.519 1.0068 2.4307z" fill="#ffffff"/></svg>),
  },
  { label: 'Recurring bills', href: '/path/recurring-bills',
    icon: (activeButton, index) => (<svg className={`sidebar-link-svg ${activeButton === index ? 'active-sidebar-svg' : ''}`} fill="#ffffff" height="auto" width="auto" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M434.83,1.624c-7.967-3.301-17.148-1.478-23.249,4.625L383.999,33.83L356.418,6.249c-8.33-8.331-21.838-8.331-30.17,0 L298.666,33.83L271.085,6.249c-8.33-8.331-21.838-8.331-30.169,0L213.333,33.83L185.752,6.249c-8.33-8.331-21.838-8.331-30.169,0 L128,33.83L100.419,6.249c-6.1-6.103-15.277-7.926-23.249-4.625C69.198,4.927,64,12.705,64,21.333v469.332 c0,11.782,9.552,21.333,21.333,21.333h341.332c11.782,0,21.333-9.552,21.333-21.333V21.333 C447.999,12.705,442.802,4.927,434.83,1.624z M298.666,426.667h-128c-11.782,0-21.333-9.553-21.333-21.333 c0-11.783,9.552-21.333,21.333-21.333h128c11.782,0,21.333,9.55,21.333,21.333C319.999,417.114,310.447,426.667,298.666,426.667z M341.332,341.334H170.666c-11.782,0-21.333-9.553-21.333-21.333c0-11.783,9.552-21.333,21.333-21.333h170.666 c11.782,0,21.333,9.55,21.333,21.333C362.666,331.781,353.114,341.334,341.332,341.334z M149.333,234.667 c0-11.783,9.552-21.333,21.333-21.333h128c11.782,0,21.333,9.55,21.333,21.333c0,11.78-9.552,21.333-21.333,21.333h-128 C158.885,256.001,149.333,246.448,149.333,234.667z M341.332,170.668H170.666c-11.782,0-21.333-9.553-21.333-21.333 c0-11.783,9.552-21.333,21.333-21.333h170.666c11.782,0,21.333,9.55,21.333,21.333 C362.666,161.115,353.116,170.668,341.332,170.668z"></path> </g> </g> </g></svg>),
  }
];

  return (
    <section className={sidebarClass}>
      <h1 className={`logo ${logoClass}`}>Vaulta</h1>

      <div className={`sidebar-link-box ${minimizedBar}`}>
        {links.map(({ label, icon, href }, index) => (
          <Link 
          href={href} 
          className={`${linkClass} ${activeButton === index ? 'activeLink' : ''}`} 
          key={index}
          onClick={() => handleLinkClick(index)}
          >
            {icon(activeButton, index)}
            <p className={`${textClass} ${displayText}`}>{label}</p>
          </Link>
        ))}
      </div>

      <button className={` ${displayText} sidebar-link minimize-menu-link ${minimize ? '' : ''}`} onClick={toggleMinimize}>
        <svg className={`sidebar-link-svg ${minimize ? 'rotateSidebarLink' : ''}`} width="auto" height="auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4V20M8 12H20M8 12L12 8M8 12L12 16" stroke="#696868" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <p className={`${textClass}`}>Minimize Menu</p>
      </button>
    </section>
  );
};

export default Sidebar;
