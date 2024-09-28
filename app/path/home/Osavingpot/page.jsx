import './o-savingpot.css';
import React from 'react';

export default function Osavingpot({ data }) {

  const totalSaved = data?.pots?.reduce((sum, pot) => sum + pot.total, 0) || 0;

  const limitedItems = data?.pots?.slice(0, 4) || [];

  return (
    <div className='overview-box osavingpot'>
      <div className='saving-inner'>
        <div className='top-row'>
          <p className='box-name'>Saving Pot</p>
          <a className='box-btn' href="">
            <button>See Details</button>
          </a>
        </div>

        <div className='saving-main'>
          <div className='saving-total'>
            <div className='savingSvgHolder'>
              <img className='savingSvg' src="/green-pot.svg" alt="pot" />
            </div>
            <div className='saving-total-sub'>
              <p className='saving-total-name'>Total Saved</p>
              <p className='saving-total-num'>${totalSaved.toFixed(2)}</p>
            </div>
          </div>

          <div className='saving-grid'>
            {limitedItems.map((item, index) => (
              <div className='savingItem' key={index}>
                <div style={{ backgroundColor: item.theme }} className='savingLine'></div>
                <h2 className='savingh2'>{item.name}</h2>
                <p className='savingp'>${item.total.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
