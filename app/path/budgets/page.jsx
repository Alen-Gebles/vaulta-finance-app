'use client';

import React, { useEffect, useState } from 'react';
import BudgetPieChart from './BudgetPieChart';
import './budgets.css';

export default function Page() {
  const [data, setData] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        setData(jsonData);

        const budgetsPerCategory = calculateCategoryBudgets(jsonData.budgets);
        setCategories(Object.entries(budgetsPerCategory).slice(0, 4));
      } catch (error) {
        console.error('Error fetching the JSON file', error);
      }
    };

    fetchData();
  }, []);

  const calculateCategoryBudgets = (budgets) =>
    budgets.reduce((acc, { category, maximum, theme }) => {
      acc[category] = { maximum, theme };
      return acc;
    }, {});

  const calculateSpendingInCategories = (transactions, selectedCategories) =>
    transactions.reduce((acc, { category, amount }) => {
      if (amount < 0 && selectedCategories[category]) {
        acc[category] = (acc[category] || 0) + Math.abs(amount);
      }
      return acc;
    }, {});

  const removeCategory = (categoryToRemove) => {
    setCategories((prevCategories) =>
      prevCategories.filter(([category]) => category !== categoryToRemove)
    );
  };

  const toggleEditPopup = (category) =>
    setActivePopup((prev) => (prev === category ? null : category));

  if (!data) return <div>Loading...</div>;

  const budgetsPerCategory = calculateCategoryBudgets(data.budgets);
  const selectedCategories = Object.keys(budgetsPerCategory)
    .slice(0, 4)
    .reduce((acc, category) => ({ ...acc, [category]: true }), {});

  const spendingInSelectedCategories = calculateSpendingInCategories(
    data.transactions,
    selectedCategories
  );
  const totalSpending = Object.values(spendingInSelectedCategories).reduce(
    (sum, amount) => sum + amount,
    0
  );
  const spendingLimit = categories.reduce((sum, [, { maximum }]) => sum + maximum, 0);

  const progressBarWidth = (spent, maximum) =>
    `${Math.min((spent / maximum) * 100, 100)}%`;

  const limitedTransactions = (category) =>
    data.transactions
      .filter((transaction) => transaction.category === category)
      .slice(0, 3);

  return (
    <section className="budgetSection">
      <div className="budgetTopRow">
        <h1>Budgets</h1>
        <button>+ Add New Budget</button>
      </div>

      <div className="budgetHolder">
        <div className="spendingSummaryBox">
          <div className="pieHolder">
            <div className="pieInfoSection">
              <h1>${totalSpending}</h1>
              <p>of ${spendingLimit} limit</p>
            </div>
            <BudgetPieChart spendingInSelectedCategories={spendingInSelectedCategories}budgetsPerCategory={budgetsPerCategory}/>
          </div>

          <div className="spendingSummarySection">
            <h1>Spending Summary</h1>
            <div className="summaryBox">
              {categories.map(([category, { theme, maximum }]) => (
                <div className="summaryItem" key={category}>
                  <div className="sumLine" style={{ backgroundColor: theme }}></div>
                  <p className="summaryCat">{category}</p>
                  <div className="summaryAmountBox">
                    <p>${spendingInSelectedCategories[category]?.toFixed(2) || 0}</p>
                    <p>of ${maximum.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="categoryContainer">
          {categories.map(([category, { theme, maximum }]) => (
            <div className="categoryBox" key={category}>
              <div className="catBoxTop">
                <div className="catDot" style={{ backgroundColor: theme }}></div>
                <h1>{category}</h1>
                <button onClick={() => toggleEditPopup(category)}>&#183;&#183;&#183;</button>
                <div className={`editPopup ${activePopup === category ? 'opacity-100' : 'opacity-0'}`}>
                  <button>Edit Budget</button>
                  <button className="text-red-700" onClick={() => removeCategory(category)} >Delete Budget</button>
                </div>
              </div>

              <div className="catBarBox">
                <p>Maximum of ${maximum.toFixed(2)}</p>
                <div className="barHolder">
                  <div className="backBar"></div>
                  <div className="progressBar" style={{ backgroundColor: theme, width: progressBarWidth(spendingInSelectedCategories[category] || 0, maximum) }}></div>
                </div>
                <div className="divCatContainer">
                  <div className="divCatBox">
                    <div className="sumLine !h-full" style={{ backgroundColor: theme }}></div>
                    <p className="catp1">Spent</p>
                    <p className="catp2">${spendingInSelectedCategories[category]?.toFixed(2)}</p>
                  </div>
                  <div className="divCatBox">
                    <div className="sumLine dcb !h-full"></div>
                    <p className="catp1">Remaining</p>
                    <p className="catp2">${maximum.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="latestSpendingBox">
                <div className="top-row">
                  <p className="box-name">Latest Spending</p>
                  <a className="box-btn" href="/path/transactions">
                    <button>See All</button>
                  </a>
                </div>

                {limitedTransactions(category).map((transaction) => (
                  <div key={transaction.name} className="transactionItem">
                    <div className="lsp1">
                      <img className="lspImg" src={transaction.avatar} alt={transaction.name} />
                      <h1 className="transactionName">{transaction.name}</h1>
                    </div>
                    <div className="lsp2">
                      <h2 className="transactionAmount">${Math.abs(transaction.amount).toFixed(2)}</h2>
                      <p className="transactionDate">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
