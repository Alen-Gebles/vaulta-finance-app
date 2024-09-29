'use client'
import './o-transactions.css';
import React, { useState, useEffect } from 'react';

export default function Otransactions({ data }) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  const transLimited = data?.transactions?.slice(0, 5) || [];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatDate = (dateString) => {
    const options = windowWidth > 764
      ? { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }
      : { year: 'numeric', month: 'short', day: 'numeric' };

    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='overview-box otransactions'>
      <div className='top-row'>
        <p className='box-name'>Transactions</p>
        <a className='box-btn' href="">
          <button>View All</button>
        </a>
      </div>

      <div className='transInner'>
        {transLimited.map((item, index) => (
          <div className='transItem' key={index}>
            <div className='transItem-left'>
              <img className='itemsAvatar' src={item.avatar} alt={item.name} />
              <p className='transName'>{item.name || 'Unknown'}</p>
            </div>
            <div className='transItem-right'>
              <h2 className={`transAmount ${item.amount > 0 ? 'text-green-700' : 'text-red-900'}`}>
                {item.amount < 0 ? `-$${Math.abs(item.amount).toFixed(2)}` : `+$${item.amount.toFixed(2)}`}
              </h2>
              <p className='transDate'>{formatDate(item.date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
