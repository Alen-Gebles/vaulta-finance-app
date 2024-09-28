import './o-balance.css';
import React from 'react';

export default function Obalance({ data }) {
  
  const balance = data?.balance || { current: 0, income: 0, expenses: 0 };

  return (
    <div className='overview-box obalanceBox'>

      <div className='balance-box bb1'>
        <p>Current Balance</p>
        <h2>${balance.current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
      </div>
      
      <div className='balance-box bb'>
        <p>Monthly Income</p>
        <h2>${balance.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
      </div>

      <div className='balance-box bb'>
        <p>Monthly Expenses</p>
        <h2>${balance.expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
      </div>

    </div>
  );
}
