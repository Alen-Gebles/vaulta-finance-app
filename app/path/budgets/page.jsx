'use client'
import React from 'react'
import './budgets.css'
import { useEffect, useState } from 'react'

export default function page() {

  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('/data.json')
    .then((response) => {
      return response.json()
    })
    .then((jsonData) => {
      setData(jsonData)
    })
    .catch((error) => {
      console.error('Error fetching the json file', error)
    })
  }, [])

  return (
    <section className='budgetSection'>

    <div className="budgetTopRow">
      <h1>Budgets</h1>
      <button>+ Add New Budget</button>
    </div>

    <div className='budgetHolder'>
      <div className="spendingSummaryBox"></div>

      <div className='categoryContainer'>
          <div className='categoryBox'>Entertainment</div>
          <div className='categoryBox'>Bills</div>
          <div className='categoryBox'>Dining Out</div>
          <div className='categoryBox'>Personal Care</div>
      </div>
    </div>
      
    </section>
  )
}
