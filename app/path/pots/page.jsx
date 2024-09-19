'use client'
import { useEffect, useState } from 'react'
import React from 'react'
import './pots.css'

export default function Page() {

  const [data, setData] = useState(null)
  const [activePopup, setActivePopup] = useState(null);

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

  const allPots = data && data.pots ? data.pots : [];

  const toggleEditPopup = (category) =>
    setActivePopup((prev) => (prev === category ? null : category));


  return (
    <section className='potsMain'>

      <div className="potTopRow">
        <h1 className='ptrH1'>Pots</h1>
        <button className='ptrbtn' onClick={() => toggleModule()}>+ Add New Pot</button>
      </div>

      {allPots.map((pot, index) => (
        <div className='pot' key={index}>
          <div className="potTop">
              <div className="potDot" style={{ backgroundColor: pot.theme }}></div>
              <h1>{pot.name}</h1>
              <button className='potEdit' onClick={() => toggleEditPopup(pot.name)}>&#183;&#183;&#183;</button>
              <div className={`editPopup ${activePopup === pot.name ? 'opacity-100' : 'opacity-0'}`}>
                <button>Edit Budget</button>
                <button>Delete Budget</button>
              </div>
          </div>
        </div>

      ))}
    </section>
  )
}