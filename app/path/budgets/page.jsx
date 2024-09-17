'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import BudgetPieChart from './BudgetPieChart';
import './budgets.css';

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((jsonData) => {
        setData(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching the json file', error);
      });
  }, []);

  const calculateCategoryBudgets = (budgets) => {
    const categoryBudgets = {};

    budgets.forEach((budget) => {
      const { category, maximum, theme } = budget;
      categoryBudgets[category] = { maximum, theme };
    });
    return categoryBudgets;
  };

  const calculateSpendingInCategories = (transactions, selectedCategories) => {
    const spendingInCategories = {};

    transactions.forEach((transaction) => {
      const { category, amount } = transaction;
      if (amount < 0 && selectedCategories[category]) {
        if (!spendingInCategories[category]) {
          spendingInCategories[category] = 0;
        }
        spendingInCategories[category] += Math.abs(amount);
      }
    });
    return spendingInCategories;
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  const budgetsPerCategory = calculateCategoryBudgets(data.budgets);

  const selectedCategories = Object.keys(budgetsPerCategory)
    .slice(0, 4)
    .reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {});


  const spendingInSelectedCategories = calculateSpendingInCategories(data.transactions, selectedCategories);

  const limitedBudgetsPerCategory = Object.entries(budgetsPerCategory).slice(0, 4);
  const limitedTransactions = (category) => {
    return data.transactions
      .filter((transaction) => transaction.category === category)
      .slice(0, 3);
  };

  const totalSpending = Object.values(spendingInSelectedCategories).reduce((sum, amount) => sum + amount, 0);
  const spendingLimit = limitedBudgetsPerCategory.reduce((sum, [category, { maximum }]) => sum + maximum, 0);

  const progressBar = (spent, maximum) => {
    const percentage = (spent / maximum) * 100;
    return `${Math.min(percentage, 100)}%`;
  };

  return (
    <section className="budgetSection">
      <div className="budgetTopRow">
        <h1>Budgets</h1>
        <button>+ Add New Budget</button>
      </div>
  
      <div className="budgetHolder">
        <div className="spendingSummaryBox">
          <div className='pieHolder'>
            <div className='pieInfoSection'>
              <h1>${totalSpending}</h1>
              <p>of ${spendingLimit} limit</p>
            </div>
            <BudgetPieChart spendingInSelectedCategories={spendingInSelectedCategories} budgetsPerCategory={budgetsPerCategory} />
          </div>
  
          <div className='spendingSummarySection'>
            <h1>Spending Summary</h1>
            <div className='summaryBox'>
              {limitedBudgetsPerCategory.map(([category, {theme, maximum}], index) => (
                <div className='summaryItem' key={category}>
                  <div className='sumLine' style={{backgroundColor: theme}}></div>
                  <p className='summaryCat'>{category}</p>
                  <div className='summaryAmountBox'>
                    <p>${spendingInSelectedCategories[category]?.toFixed(2)}</p>
                    <p>of ${maximum.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="categoryContainer">
          {limitedBudgetsPerCategory.map(([category, {theme, maximum}], index) => (
            <div className="categoryBox" key={category}>
              <div className='catBoxTop'>
                <div className='catDot' style={{backgroundColor: theme}}></div>
                <h1>{category}</h1>
                <button>&#183;&#183;&#183;</button>
              </div>
  
              <div className='catBarBox'>
                <p>Maximum of ${maximum.toFixed(2)}</p>
                <div className='barHolder'>
                  <div className='backBar'></div>
                  <div className='progressBar' style={{backgroundColor: theme, width: progressBar(spendingInSelectedCategories[category] || 0, maximum)}}></div>
                </div>
                <div className='divCatContainer'>
                  <div className='divCatBox'>
                    <div className='sumLine !h-full' style={{backgroundColor: theme}}></div>
                    <p className='catp1'>Spent</p>
                    <p className='catp2'>${spendingInSelectedCategories[category]?.toFixed(2)}</p>
                  </div>
                  <div className='divCatBox'>
                    <div className='sumLine dcb !h-full'></div>
                    <p className='catp1'>Remaining</p>
                    <p className='catp2'>${maximum.toFixed(2)}</p>
                  </div>
                </div>
              </div>
  
              <div className='latestSpendingBox'>
                <div className='top-row'>
                  <p className='box-name'>Latest Spending</p>
                  <a className='box-btn' href="/path/transactions">
                    <button>See All</button>
                  </a>
                </div>
  
                <div className='latestSpendingBox'>
                  {limitedTransactions(category).map((transaction) => (
                    <div key={transaction.name} className='transactionItem'>
                      <div className='lsp1'>
                        <img className='lspImg' src={transaction.avatar} alt="img" />
                        <h1 className='transactionName'>{transaction.name}</h1>
                      </div>

                      <div className='lsp2'>
                        <h2 className='transactionAmount'>${Math.abs(transaction.amount).toFixed(2)}</h2>
                        <p className='transactionDate'>{new Date(transaction.date).toLocaleDateString()}</p>  
                      </div>
                      
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
