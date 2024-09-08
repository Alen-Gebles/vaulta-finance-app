import './o-mybudget.css';
import React from 'react';

export default function Omybudget({ data }) {

  const calculateCategoryBudgets = (budgets) => {
    const categoryBudgets = {};
  
    budgets.forEach(budget => {
      const { category, maximum, theme } = budget;
      if (!categoryBudgets[category]) {
        categoryBudgets[category] = {};
      }
  
      categoryBudgets[category] = { maximum, theme };
    });
    return categoryBudgets;
  };

  const calculateSpendingInCategories = (transactions, selectedCategories) => {
    const spendingInCategories = {};

    transactions.forEach(transaction => {
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

  const budgetsPerCategory = calculateCategoryBudgets(data.budgets);

  const selectedCategories = Object.keys(budgetsPerCategory).slice(0, 4).reduce((acc, category) => {
    acc[category] = true;
    return acc;
  }, {});

  const spendingInSelectedCategories = calculateSpendingInCategories(data.transactions, selectedCategories);
  const limitedBudgetsPerCategory = Object.entries(budgetsPerCategory).slice(0, 4);

  const totalSpending = Object.values(spendingInSelectedCategories).reduce((sum, amount) => sum + amount, 0);
  const spendingLimit = limitedBudgetsPerCategory.reduce((sum, [category, { maximum }]) => sum + maximum, 0)


  return (
    <div className='overview-box omybudget'>
      <div className='top-row'>
        <p className='box-name'>My Budgets</p>
        <a className='box-btn' href="">
          <button>See Details</button>
        </a>
      </div>

      <div className='catCircle'>
        <p>spent: {totalSpending}</p>
        <p>limit: {spendingLimit}</p>
      </div>

      <div className='catBudgetBox'>
        {limitedBudgetsPerCategory.map(([category, { maximum, theme }]) => (
          <div className='catBudget' key={category}>
            <div style={{backgroundColor: theme }} className='categoryLine'></div>
            <p className='catName'>{category}</p>
            <h2 className='catMax'>${maximum.toFixed(2)}</h2>
          </div>
        ))}
      </div>
      <h1>Limit:</h1>
    </div>
  );
}
