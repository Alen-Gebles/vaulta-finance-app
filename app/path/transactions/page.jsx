'use client';

import React, { useEffect, useState, useRef } from 'react';
import './transactions.css';
import getData from '@/app/data'; 

export default function Page() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Transactions");
  const sortTypeRef = useRef("dateDesc");

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setTransactions(data.transactions);
      setFilteredTransactions(data.transactions);
    }
    fetchData();
  }, []);

  const sortTransactions = (transactionsToSort) => {
    let sorted = [...transactionsToSort];
    const sortType = sortTypeRef.current;

    if (sortType === "amountAsc") {
      sorted.sort((a, b) => a.amount - b.amount);
    } else if (sortType === "amountDesc") {
      sorted.sort((a, b) => b.amount - a.amount);
    } else if (sortType === "dateAsc") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === "dateDesc") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return sorted;
  };

  const filterByCategory = (transactions, category) => {
    if (category === "All Transactions") {
      return transactions;
    }
    return transactions.filter((transaction) => transaction.category === category);
  };

  const filterBySearchQuery = (transactions, query) => {
    return transactions.filter((transaction) =>
      transaction.name.toLowerCase().includes(query) ||
      transaction.category.toLowerCase().includes(query) ||
      new Date(transaction.date).toLocaleDateString().includes(query) ||
      transaction.amount.toString().includes(query)
    );
  };

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);

    const filteredByCategory = filterByCategory(transactions, newCategory);

    const filteredBySearch = filterBySearchQuery(filteredByCategory, searchQuery);

    setFilteredTransactions(sortTransactions(filteredBySearch));
  };


  const handleSortChange = (e) => {
    const newSortType = e.target.value;
    sortTypeRef.current = newSortType;

    const filteredByCategory = filterByCategory(transactions, selectedCategory);
    const filteredBySearch = filterBySearchQuery(filteredByCategory, searchQuery);
    setFilteredTransactions(sortTransactions(filteredBySearch));
  };


  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);


    const filteredByCategory = filterByCategory(transactions, selectedCategory);
    const filteredBySearch = filterBySearchQuery(filteredByCategory, query);
    setFilteredTransactions(sortTransactions(filteredBySearch));
  };

  return (
    <>
      <section className="transSection">
        <h1 className="transH1">Transactions</h1>

        <main className="transMain">
          <div className="transTopRow">
            <div className="inputBox">
              <svg width="64px" height="64px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="matrix(-1, 0, 0, 1, 0, 0)" stroke="#7a7a7a"><path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="rgb(228, 228, 228)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <input 
                className="transInput" 
                type="text" 
                placeholder="Search Transaction" 
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>

            <div className="transSort">
              <select name="sort" id="sort" className="transDropdown" onChange={handleSortChange}>
                <option value="dateDesc">Latest</option>
                <option value="dateAsc">Oldest</option>
                <option value="amountDesc">Highest</option>
                <option value="amountAsc">Lowest</option>
              </select>

              <select name="category" id="category" className="transDropdown transDropdown2" onChange={handleCategoryChange}>
                <option value="All Transactions">All Transactions</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bills">Bills</option>
                <option value="Groceries">Groceries</option>
                <option value="Dining Out">Dining Out</option>
                <option value="Transportation">Transportation</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Education">Education</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Shopping">Shopping</option>
                <option value="General">General</option>
              </select>
            </div>
          </div>

          <div className="allTransactions">
            {Array.isArray(filteredTransactions) && filteredTransactions.map((item, index) => (
              <div key={index} className="transItem">
                <div className="transNameRow">
                  <img className="transAvatar" src={item.avatar} alt={item.name} />
                  <div className="transNameInfo">
                    <h2 className="font-semibold transName">{item.name}</h2>
                    <p className="text-gray-500 text-sm">{item.category}</p>
                  </div>
                </div>

                <div className="transAmount">
                  <p className="transDate">{new Date(item.date).toLocaleDateString()}</p>
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
