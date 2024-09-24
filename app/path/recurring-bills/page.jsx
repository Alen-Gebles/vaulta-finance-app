'use client'

import React from 'react'
import './recurringBills.css'
import { useState, useEffect } from 'react'

export default function page() {

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching the JSON file', error);
      }
    };

    fetchData();
  }, []);

  /*///////////////////////////////////////////////////////////////////*/

  const allTransactions = data && data.transactions ? data.transactions : [];

  return (
    <section className='recurringBillsSection'>
      <div className='billTopRow'>
        <h1 className='billTopRowH1'>Recurring Bills</h1>
      </div>

      <div className='billDivider'>

        <div className='leftPartBill'>
          <div className='totalBillsBox'>
          {allTransactions.map((transaction, index) => (
              <h1 key={index}>{transaction.name}</h1>
            ))}
          </div>

          <div className='summaryBillsBox'></div>
        </div>


        <div className='rightPartBill'></div>
      </div>
    </section>
  )
}