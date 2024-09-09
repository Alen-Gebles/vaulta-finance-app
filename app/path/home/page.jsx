import Obalance from './Obalance/page'
import Omybudget from './Omybudget/page'
import Oreccuringbills from './Oreccuringbills/page'
import Osavingpot from './Osavingpot/page'
import Otransactions from './Otransactions/page'
import './overview.css'


import React from 'react'

function Home({ data }) {
  return (
    <section className='overview-main'>
      <h1 className='MainHeadline'>Overview</h1>
      <Obalance data={data}/>

    <div className='overviewContainer'>
      <div className='overview2'>
        <Osavingpot data={data}/>
        <Otransactions data={data}/>
      </div>

      <div className='overview3'>
        <Omybudget data={data}/>
        <Oreccuringbills data={data}/>  
      </div>
    </div>
      
      
    </section>
  )
}

export default Home;
