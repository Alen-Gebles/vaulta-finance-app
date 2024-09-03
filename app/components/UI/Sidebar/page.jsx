import React from 'react'
import './sidebar.css'

export default function Sidebar() {
  return (
    <section className='sidebar'>
      <h1 className='logo'>Vaulta</h1>

      <div className='sidebar-link-box'>

        <div className='sidebar-link'>
          <button>Overview</button>
        </div>

        <div className='sidebar-link'>
          <button>Transactions</button>
        </div>

        <div className='sidebar-link'>
          <button>Budgets</button>
        </div>

        <div className='sidebar-link'>
          <button>Pots</button>
        </div>

        <div className='sidebar-link'>
          <button>Recurring bills</button>
        </div>
        
      </div>
    </section>
  )
}
