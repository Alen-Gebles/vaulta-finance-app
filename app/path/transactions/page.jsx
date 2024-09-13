import React from 'react';
import './transactions.css';
import getData from '@/app/data';

export default async function Page() {
  const data = await getData();
  const transData = data.transactions

  return (
    <>
      <section className='transSection'>
        <h1 className='transH1'>Transactions</h1>

        <main className='transMain'>
          <div className='transTopRow'>
            <input className='transInput' type="text" placeholder='Search Transaction' />
            <div className='transSort'>
              <select name="sort" id="sort" className='transDropdown'>
                <option value="sort1">Latest</option>
                <option value="sort2">Oldest</option>
                <option value="sort3">A to Z</option>
                <option value="sort4">Z to A</option>
                <option value="sort5">Highest</option>
                <option value="sort6">Lowest</option>
              </select>

              <select name="category" id="category" className='transDropdown transDropdown2'>
                <option value="category1">All Transactions</option>
                <option value="category2">Entertainment</option>
                <option value="category3">Bills</option>
                <option value="category4">Groceries</option>
                <option value="category5">Dining Out</option>
                <option value="category6">Transportation</option>
                <option value="category7">Personal Care</option>
              </select>
            </div>
          </div>

          <div className='allTransactions'>
            {Array.isArray(transData) && transData.map((item, index) => (
              <div key={index} className='transItem'>
                <div className='transNameRow'>
                    <img className='transAvatar' src={item.avatar} alt={index} />
                  <div className='transNameInfo'>
                    <h2 className='font-semibold transName'>{item.name}</h2>
                    <p className='text-gray-500 text-sm'>{item.category}</p>
                  </div>  
                </div>
                                
                <div className='transAmount'>
                  <p className='transDate'>{new Date(item.date).toLocaleDateString()}</p>
                  <p className={`font-semibold ${item.amount > 0 ? 'text-green-700' : 'text-red-900'}`}>
                  {item.amount < 0 ? `-$${Math.abs(item.amount).toFixed(2)}` : `+$${item.amount.toFixed(2)}`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </section>
    </>
  );
}
