import './o-reccuringbills.css';
import React from 'react';

export default function Oreccuringbills({ data }) {

  const calculateRecurringTotal = (transactions) => {
    return transactions
      .filter(transaction => transaction.recurring)
      .reduce((total, transaction) => total + Math.abs(transaction.amount), 0);
  };

  const totalRecurring = calculateRecurringTotal(data.transactions);

  return (
    <div className='overview-box oreccuringbills'>

      <div className='billInner'>

        <div className='top-row'>
          <p className='box-name'>Recurring Bills</p>
          <a className='box-btn' href="">
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
            <h1>$325.98</h1>
          </div>

          <div className='billRow'>
            <p>Total bills due soon</p>
            <h1>$40.00</h1>
          </div>
        </div>

      </div>
    </div>
  );
}
