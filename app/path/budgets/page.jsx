'use client'
import React, { useEffect, useState } from 'react';
import BudgetPieChart from './BudgetPieChart';
import './budgets.css';

export default function Page() {
  const [data, setData] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [activeDelete, setActiveDelete] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catInput, setCatInput] = useState(false)
  const [input, setInput] = useState('');
  const [categoryInput, setCategoryInput] = useState();
  const [colorInput, setColorInput] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        setData(jsonData);
        
        updateCategories(jsonData);
      } catch (error) {
        console.error('Error fetching the JSON file', error);
      }
    };

    fetchData();
  }, []);

  const updateCategories = (data) => {
    const budgetsPerCategory = calculateCategoryBudgets(data.budgets);
    setCategories(Object.entries(budgetsPerCategory));
  };

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
    setData((prevData) => {
      const updatedBudgets = prevData.budgets.filter(({ category }) => category !== categoryToRemove);
      return { ...prevData, budgets: updatedBudgets };
    });
    setActiveDelete(false)
    setActivePopup(false)
  };

  const toggleEditPopup = (category) =>
    setActivePopup((prev) => (prev === category ? null : category));

  if (!data) return <div>Loading...</div>;

  const budgetsPerCategory = calculateCategoryBudgets(data.budgets);
  const selectedCategories = Object.keys(budgetsPerCategory)
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

  /*///////////////INPUT MODULE//////////////////////*/
    const toggleModule = () => {
      setCatInput(prevState => !prevState);
    };
    const toggleDeleteModule = () => {
      setActiveDelete(prevState => !prevState);
    };
    const categoriesMenu = [
      "Select Category","Entertainment", "Bills", "Groceries", "Dining Out", "Transportation", 
      "Personal Care", "Education", "Lifestyle", "Shopping", "General"
    ];
    const themes = [
      { color: "#000000", name: "Select Color" },
      { color: "#277C78", name: "Green" },
      { color: "#F2CDAC", name: "Yellow" },
      { color: "#82C9D7", name: "Cyan" },
      { color: "#626070", name: "Navy" },
      { color: "#FF0000", name: "Red" },
      { color: "#800080", name: "Purple" },
      { color: "#40E0D0", name: "Turquoise" },
      { color: "#A52A2A", name: "Brown" },
      { color: "#FF00FF", name: "Magenta" },
      { color: "#0000FF", name: "Blue" },
      { color: "#808080", name: "Grey" },
      { color: "#4B5320", name: "Army" },
      { color: "#FFC0CB", name: "Pink" },
      { color: "#FFA500", name: "Orange" }
    ];
    const handleInputChange = (event) => {
      setInput(event.target.value);
    };
    const handleCategoryChange = (event) => {
      setCategoryInput(event.target.value);
    };
    const handleColorChange = (event) => {
      setColorInput(event.target.value);
    };

    const addNewBudget = () => {
      if (!categoryInput || !input || !colorInput) {
        alert("Please fill out all fields before adding a budget.");
        return;
      }
  
      const newBudget = {
        category: categoryInput,
        maximum: parseFloat(input),
        theme: colorInput
      };
  
      setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories, [categoryInput, newBudget]];
        return updatedCategories;
      });
  
      setData((prevData) => ({...prevData, budgets: [...prevData.budgets, newBudget]}));
  
      setCategoryInput('');
      setInput('');
      setColorInput('');
      setCatInput(false);
    };
  /*/////////////////////////////////////////////////*/

  return (
    <section className="budgetSection">
      <div className={`dimScreen ${!catInput ? 'hidden' : 'flex'}`}>
          <div className={`newBudget ${!catInput ? 'opacity-0' : 'opacity-100'}`}>
            <div className='w-full flex justify-between items-center newHeadline'>
              <h1>Add New Budget</h1>
              <button className='newHeadlineBtn' onClick={() => toggleModule()}><svg fill="#696868" height="64px" width="64px" version="1.1" id="Layer_1" viewBox="0 0 492 492"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872 c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872 c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052 L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116 c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952 c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116 c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"></path> </g> </g> </g></svg></button>
            </div>
            <p className='text-gray-500 text-sm mt-3 mb-3'>Choose a category to set a spending budget. These categories can help you monitor spending.</p>

            <p className='budgetlabel'>Budget Category</p>
            <select name="category" className="categoryDropdown" onChange={handleCategoryChange}>
              {categoriesMenu.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <p className='budgetlabel'>Maximum Spend</p>
            <input value={input} onChange={handleInputChange} className="categoryDropdown" type="text" placeholder='$ e.g. 2000' />

            <p className='budgetlabel'>Theme</p>
            <select name="theme" className="categoryDropdown" onChange={handleColorChange}>
              {themes.map(({ color, name }) => (
                <option className='catOption' key={color} value={color}>
                  {name}
                </option>
              ))}
            </select>

            <button className='addBudgetBtn' onClick={addNewBudget}>Add Budget</button>
          </div>
      </div>

      <div className="budgetTopRow">
        <h1>Budgets</h1>
        <button onClick={() => toggleModule()}>+ Add New Budget</button>
      </div>

      <div className="budgetHolder">
        <div className="spendingSummaryBox">
          <div className="pieHolder">
            <div className="pieInfoSection">
              <h1>${totalSpending.toFixed(2)}</h1>
              <p>of ${spendingLimit.toFixed(2)} limit</p>
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

              {/*Delete Conformation */}
              <div className={`deleteConformation ${activeDelete ? 'flex' : 'hidden'}`}>
                <h1>Delete this budget?</h1>
                <p>Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.</p>
                <button className='deleteConfBtn1' onClick={() => removeCategory(category)}>Yes, Confirm Deletion</button>
                <button className='deleteConfBtn2' onClick={toggleDeleteModule}>No, Go Back</button>
              </div>

              <div className="catBoxTop">
                <div className="catDot" style={{ backgroundColor: theme }}></div>
                <h1>{category}</h1>
                <button onClick={() => toggleEditPopup(category)}>&#183;&#183;&#183;</button>
                <div className={`editPopup ${activePopup === category ? 'opacity-100' : 'opacity-0'}`}>
                  <button>Edit Budget</button>
                  <button onClick={toggleDeleteModule}>Delete Budget</button>
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
                    <p className="catp2">${(maximum - (spendingInSelectedCategories[category] || 0)).toFixed(2)}</p>
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
