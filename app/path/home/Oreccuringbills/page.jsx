import './o-reccuringbills.css';
import React from 'react';

export default function Oreccuringbills({ data }) {

  const transactions = data?.transactions || [];


  const calculateRecurringTotal = (transactions) => {
    return transactions
      .filter(transaction => transaction.recurring)
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  };

  const calculateRemainingThisMonth = (transactions) => {
    return transactions
      .filter(transaction => transaction.recurring && transaction.dueThisMonth) 
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  };

  const calculateDueSoon = (transactions) => {
    return transactions
      .filter(transaction => transaction.recurring && transaction.dueSoon) 
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  };

  const totalRecurring = calculateRecurringTotal(transactions);
  const remainingThisMonth = calculateRemainingThisMonth(transactions);
  const dueSoon = calculateDueSoon(transactions);

  return (
    <div className='overview-box oreccuringbills'>
      <div className='billInner'>
        <div className='top-row'>
          <p className='box-name'>Recurring Bills</p>
          <a className='box-btn' href="/path/recurring-bills">
            <button>See Details</button>
          </a>
        </div>

        <div className='billBox'>
          <div className='billRow'>
            <p>Total recurring bills</p>
            <h1>${totalRecurring.toFixed(2)}</h1>
          </div>

          <div className='billRow'>
            <p>Remaining this month</p>
            <h1>${remainingThisMonth.toFixed(2)}</h1>
          </div>

          <div className='billRow'>
            <p>Total bills due soon</p>
            <h1>${dueSoon.toFixed(2)}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
