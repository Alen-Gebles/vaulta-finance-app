import './o-balance.css'
import React from 'react'

export default function Obalance({ data }) {
  return (
    <div className='overview-box obalanceBox'>

      <div className='balance-box bb1'>
        <p>Current Balance</p>
        <h2>${data.balance.current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
      </div>
      
      <div className='balance-box bb'>
        <p>Monthly Income</p>
        <h2>${data.balance.income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
      </div>

      <div className='balance-box bb'>
        <p>Monthly Expenses</p>
        <h2>${data.balance.expenses.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
      </div>

    </div>
  )
}
