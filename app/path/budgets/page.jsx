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

  const totalSpending = Object.values(spendingInSelectedCategories).reduce((sum, amount) => sum + amount, 0);
  const spendingLimit = limitedBudgetsPerCategory.reduce((sum, [category, { maximum }]) => sum + maximum, 0);

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
            <BudgetPieChart spendingInSelectedCategories={spendingInSelectedCategories}budgetsPerCategory={budgetsPerCategory}/>
          </div>

          <div className='spendingSummarySection'>
            <h1>Spending Summary</h1>
            <div>
              {limitedBudgetsPerCategory.map(([category, {theme, maximum}, index]) => (
                <div key={category}>
                  <p>{category}</p>
                  <div>
                    <p>${spendingInSelectedCategories[category]?.toFixed(2)}</p>
                    <p>of ${maximum.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>

        <div className="categoryContainer">
          <div className="categoryBox">Entertainment</div>
          <div className="categoryBox">Bills</div>
          <div className="categoryBox">Dining Out</div>
          <div className="categoryBox">Personal Care</div>
        </div>
      </div>
    </section>
  );
}
