import Obalance from './Obalance/page'
import Omybudget from './Omybudget/page'
import Oreccuringbills from './Oreccuringbills/page'
import Osavingpot from './Osavingpot/page'
import Otransactions from './Otransactions/page'

import './overview.css'

import React from 'react'

function Overview() {
  return (
    <section className='overview-main'>
      <Obalance />

    <div className='overviewContainer'>
      <div className='overview2'>
        <Osavingpot />
        <Otransactions />
      </div>

      <div className='overview3'>
        <Omybudget />
        <Oreccuringbills />  
      </div>
    </div>
      
      
    </section>
  )
}

export default Overview;
