'use client';
import React, { useState, useEffect } from 'react';
import './recurringBills.css';
import getData from '@/app/data'; 

export default function Page() {
  const [data, setData] = useState(null);
  const [originalBills, setOriginalBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [paidBills, setPaidBills] = useState([]);
  const [upcomingBills, setUpcomingBills] = useState([]);
  const [dueSoonBills, setDueSoonBills] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const dataLink = 'https://alen-gebles.github.io/vaulta-finance-app'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setData(data);

        const filteredBillsTTC = data.transactions.filter(item => item.recurring === true);
        setOriginalBills(filteredBillsTTC);
        setFilteredBills(filteredBillsTTC);

        categorizeBills(filteredBillsTTC);
      } catch (error) {
        console.error('Error fetching the JSON file', error);
      }
    };

    fetchData();
  }, []);

  const categorizeBills = (bills) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const dueSoonThreshold = 5;

    const paid = [];
    const upcoming = [];
    const dueSoon = [];

    bills.forEach(bill => {
      const billDate = new Date(bill.date);
      billDate.setHours(0, 0, 0, 0);

      if (billDate < now) {
        paid.push(bill);
      } else if (billDate >= now && billDate <= new Date(now.getTime() + (dueSoonThreshold * 24 * 60 * 60 * 1000))) {
        dueSoon.push(bill);
      } else {
        upcoming.push(bill);
      }
    });

    setPaidBills(paid);
    setUpcomingBills(upcoming);
    setDueSoonBills(dueSoon);
  };

  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    let sortedBills = [...filteredBills];
    if (selectedOption === 'dateDesc') {
      sortedBills.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selectedOption === 'dateAsc') {
      sortedBills.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (selectedOption === 'amountDesc') {
      sortedBills.sort((a, b) => a.amount - b.amount);
    } else if (selectedOption === 'amountAsc') {
      sortedBills.sort((a, b) => b.amount - a.amount);
    }
    setFilteredBills(sortedBills);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = originalBills.filter(
      (bill) =>
        bill.name.toLowerCase().includes(term) ||
        bill.category.toLowerCase().includes(term)
    );

    setFilteredBills(filtered);
  };

  function getOrdinalSuffix(n) {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }

  const totalAmount = originalBills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidTotal = paidBills.reduce((sum, bill) => sum + bill.amount, 0);
  const upcomingTotal = upcomingBills.reduce((sum, bill) => sum + bill.amount, 0);
  const dueSoonTotal = dueSoonBills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <section className='recurringBillsSection'>
      <div className='billTopRow'>
        <h1 className='billTopRowH1'>Recurring Bills</h1>
      </div>

      <div className='billDivider'>
        <div className='leftPartBill'>
          <div className='totalBillsBox'>
            <svg className="billSvg" fill="#ffffff" height="auto" width="auto" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.999 511.999"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M434.83,1.624c-7.967-3.301-17.148-1.478-23.249,4.625L383.999,33.83L356.418,6.249c-8.33-8.331-21.838-8.331-30.17,0 L298.666,33.83L271.085,6.249c-8.33-8.331-21.838-8.331-30.169,0L213.333,33.83L185.752,6.249c-8.33-8.331-21.838-8.331-30.169,0 L128,33.83L100.419,6.249c-6.1-6.103-15.277-7.926-23.249-4.625C69.198,4.927,64,12.705,64,21.333v469.332 c0,11.782,9.552,21.333,21.333,21.333h341.332c11.782,0,21.333-9.552,21.333-21.333V21.333 C447.999,12.705,442.802,4.927,434.83,1.624z M298.666,426.667h-128c-11.782,0-21.333-9.553-21.333-21.333 c0-11.783,9.552-21.333,21.333-21.333h128c11.782,0,21.333,9.55,21.333,21.333C319.999,417.114,310.447,426.667,298.666,426.667z M341.332,341.334H170.666c-11.782,0-21.333-9.553-21.333-21.333c0-11.783,9.552-21.333,21.333-21.333h170.666 c11.782,0,21.333,9.55,21.333,21.333C362.666,331.781,353.114,341.334,341.332,341.334z M149.333,234.667 c0-11.783,9.552-21.333,21.333-21.333h128c11.782,0,21.333,9.55,21.333,21.333c0,11.78-9.552,21.333-21.333,21.333h-128 C158.885,256.001,149.333,246.448,149.333,234.667z M341.332,170.668H170.666c-11.782,0-21.333-9.553-21.333-21.333 c0-11.783,9.552-21.333,21.333-21.333h170.666c11.782,0,21.333,9.55,21.333,21.333 C362.666,161.115,353.116,170.668,341.332,170.668z"></path> </g> </g> </g></svg>
            <p className='billsTotalP'>Total Bills</p>
            <h1 className='billsTotalH1'>${Math.abs(totalAmount.toFixed(2))}</h1>
          </div>

          <div className='summaryBillsBox'>
            <h1 className='summaryH1'>Summary</h1>
            <div className='summaryBox'>
              <div className='summaryRow'>
                <p>Paid Bills</p>
                <p>{paidBills.length} (${Math.abs(paidTotal.toFixed(2))})</p>
              </div>

              <div className='summaryRow'>
                <p>Upcoming Bills</p>
                <p>{upcomingBills.length} (${Math.abs(upcomingTotal.toFixed(2))})</p>
              </div>

              <div className='summaryRow text-red-500'>
                <p className='!text-red-500'>Due Soon</p>
                <p>{dueSoonBills.length} (${Math.abs(dueSoonTotal.toFixed(2))})</p>
              </div>
            </div>
          </div>
        </div>

        <div className='rightPartBill'>
          <div className="transTopRow">
            <div className="inputBox">
              <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#7a7a7a"><path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="rgb(228, 228, 228)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <input
                className="transInput"
                type="text"
                placeholder="Search Bills"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <select
              name="sort"
              id="sort"
              className="transDropdown"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="">Sort by</option>
              <option value="dateDesc">Latest</option>
              <option value="dateAsc">Oldest</option>
              <option value="amountDesc">Highest</option>
              <option value="amountAsc">Lowest</option>
            </select>
          </div>

          <div className='billHolderBox'>
            {filteredBills.map((bill, index) => (
              <div key={index} className='recurringBill'>
                <div className='reccLeft'>
                  <img className='reccImg' src={`${dataLink}${bill.avatar}`} alt={index} />
                  <p className='billName'>{bill.name}</p>
                </div>
                
                <div className='reccRight'>
                  <p className='text-green-700'>Monthly-{getOrdinalSuffix(new Date(bill.date).getUTCDate())}</p>
                  <p className='font-semibold text-lg'>${Math.abs(bill.amount)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
