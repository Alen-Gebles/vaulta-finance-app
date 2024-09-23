'use client'
import { useEffect, useState } from 'react'
import React from 'react'
import './pots.css'

export default function Page() {

  const [data, setData] = useState(null)
  const [toggleNewPot, setToggleNewPot] = useState(false)
  const [activeDelete, setActiveDelete] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [input, setInput] = useState('');
  const [spend, setSpend] = useState();
  const [color, setColor] = useState('');
  const [addMoneyToPot, setAddMoneyToPot] = useState()
  const [money, setMoney] = useState()
  const [selectedPot, setSelectedPot] = useState(null);


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

  /*////////////////////////////////////////////////////////////////////*/

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

  const allPots = data && data.pots ? data.pots : [];

  const toggleEditPopup = (category) =>
    setActivePopup((prev) => (prev === category ? null : category));

  const potBarWidth = (total = '0.00', target) =>
    Math.min((total / target) * 100, 100);

  const deletePot = (name) => {
    const filteredPots = allPots.filter((pot) => pot.name !== name);
    setData({ ...data, pots: filteredPots });
    setActiveDelete(null);
    setActivePopup(false); 
  };

  const toggleDeleteModule = (potName) => {
    setActiveDelete((prev) => (prev === potName ? null : potName)); 
  }

  const toggleNewPotBtn = () => {
    setToggleNewPot(prevState => !prevState)
  } 

  const toggleAddMoney = (pot) => {
    setSelectedPot(pot);
    setAddMoneyToPot((prevState) => !prevState);
  };
  

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const handleSpendChange = (event) => {
    setSpend(event.target.value);
  };
  const handleColorChange = (event) => {
    setColor(event.target.value);
  };
  const handleMoneyAdding = (event) => {
    const value = event.target.value;
    if (value.trim() === '') {
      setMoney(0);
    } else {
      setMoney(value);
    }
  };

  const addNewPot = () => {
    const newPot = {
      name: input,
      target: parseFloat(spend),
      theme: color
    };
    setData((prevData) => ({ ...prevData, pots: [...prevData.pots, newPot] }));

    toggleNewPotBtn()
    setInput('');
    setSpend('');
    setColor('');
  };

  const addMoney = () => {
    const newAmount = parseFloat(money.trim());
    if (isNaN(newAmount) || newAmount <= 0) return;

    const newTotal = (selectedPot.total || 0) + newAmount;
    setData((prevData) => {
        const updatedPots = prevData.pots.map(pot => pot.name === selectedPot.name ? { ...pot, total: newTotal } : pot);
        return { ...prevData, pots: updatedPots };
    });

    setAddMoneyToPot(false);
    setMoney('');
}
  

  
/*//////////////////////////////////////////////////////////////////////*/

  return (
    <section className='potsMain'>

      <div className="potTopRow">
        <h1 className='ptrH1'>Pots</h1>
        <button className='ptrbtn' onClick={() => toggleNewPotBtn()}>+ Add New Pot</button>
      </div>

      {allPots.map((pot, index) => (
        <div className='pot' key={index}>

          {/*NEW POT*/}
          <div className={`dimScreen ${!toggleNewPot ? 'hidden' : 'flex'}`}>
            <div className={`newBudget ${!toggleNewPot ? 'opacity-0' : 'opacity-100'}`}>
              <div className='w-full flex justify-between items-center newHeadline'>
                <h1>Add New Pot</h1>
                <button className='newHeadlineBtn' onClick={() => toggleNewPotBtn()}>
                  <svg fill="#696868" height="64px" width="64px" version="1.1" id="Layer_1" viewBox="0 0 492 492"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872 c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872 c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052 L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116 c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952 c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116 c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"></path> </g> </g> </g></svg>
                </button>
              </div>
              <p className='text-gray-500 text-sm mt-3 mb-3'>Choose a category to set a spending budget. These categories can help you monitor spending.</p>

              <p className='budgetlabel'>Pot Name</p>
              <input value={input}  onChange={handleInputChange} className="categoryDropdown" type="text" placeholder='e.g. Rainy Days' />

              <p className='budgetlabel'>Maximum Spend</p>
              <input value={spend}  onChange={handleSpendChange}  className="categoryDropdown" type="text" placeholder='$ e.g. 2000' />

              <p className='budgetlabel'>Theme</p>
              <select name="theme" className="categoryDropdown" value={color} onChange={handleColorChange}>
                {themes.map(({ color, name }) => (
                  <option className='catOption' key={color} value={color}>
                    {name}
                  </option>
                ))}
              </select>



              <button className='addBudgetBtn' onClick={addNewPot}>Add Pot</button>
            </div>
          </div>
          {/*///////*/}

          <div className="potTop">
              <div className="potDot" style={{ backgroundColor: pot.theme }}></div>
              <h1>{pot.name}</h1>
              <button className='potEdit' onClick={() => toggleEditPopup(pot.name)}>&#183;&#183;&#183;</button>
              <div className={`editPopup ${activePopup === pot.name ? 'opacity-100' : 'opacity-0'}`}>
                <button>Edit Pot</button>
                <button onClick={() => toggleDeleteModule(pot.name)}>Delete Pot</button>
              </div>

              {/*Delete Confirmation */}
              <div className={`deleteConformation ${activeDelete === pot.name ? 'flex' : 'hidden'}`}>
                <h1>Delete this Pot?</h1>
                <p>Are you sure you want to delete this Pot? This action cannot be reversed, and all the data inside it will be removed forever.</p>
                <button className='deleteConfBtn1' onClick={() => deletePot(pot.name)}>Yes, Confirm Deletion</button>
                <button className='deleteConfBtn2' onClick={() => toggleDeleteModule(null)}>No, Go Back</button>
              </div>
              {/*///////*/}


          {/* Add Money */}
          <div className={`dimScreen ${!addMoneyToPot ? 'hidden' : 'flex'}`}>
            <div className={`newBudget ${!addMoneyToPot ? 'opacity-0' : 'opacity-100'}`}>
              <div className='w-full flex justify-between items-center newHeadline'>
                <h1>Add To Saving</h1>
                <button className='newHeadlineBtn' onClick={() => toggleAddMoney()}>
                <svg fill="#696868" height="64px" width="64px" version="1.1" id="Layer_1" viewBox="0 0 492 492"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M300.188,246L484.14,62.04c5.06-5.064,7.852-11.82,7.86-19.024c0-7.208-2.792-13.972-7.86-19.028L468.02,7.872 c-5.068-5.076-11.824-7.856-19.036-7.856c-7.2,0-13.956,2.78-19.024,7.856L246.008,191.82L62.048,7.872 c-5.06-5.076-11.82-7.856-19.028-7.856c-7.2,0-13.96,2.78-19.02,7.856L7.872,23.988c-10.496,10.496-10.496,27.568,0,38.052 L191.828,246L7.872,429.952c-5.064,5.072-7.852,11.828-7.852,19.032c0,7.204,2.788,13.96,7.852,19.028l16.124,16.116 c5.06,5.072,11.824,7.856,19.02,7.856c7.208,0,13.968-2.784,19.028-7.856l183.96-183.952l183.952,183.952 c5.068,5.072,11.824,7.856,19.024,7.856h0.008c7.204,0,13.96-2.784,19.028-7.856l16.12-16.116 c5.06-5.064,7.852-11.824,7.852-19.028c0-7.204-2.792-13.96-7.852-19.028L300.188,246z"></path> </g> </g> </g></svg>
                </button>
              </div>
              <p className='text-gray-500 text-sm mt-3 mb-3'>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet.
              </p>

              <div className='potTotalSaved'>
                <p className='potTotalSavedP'>New Amount</p>
                <h2 className='potTotalSavedH2'>${selectedPot ? (selectedPot.total ? selectedPot.total.toFixed(2) : '0.00') : '0.00'}</h2>
              </div>

              <div className='potBarHolder'>
                <div className='potBarHolderBcg'></div>
                <div className='potBarHolderMain' style={{ backgroundColor: selectedPot?.theme, width: `${potBarWidth(selectedPot?.total || 0, selectedPot?.target || 0)}%` }}></div>
              </div>

              <div className='barInfoHolder'>
                <p className='barInfoHolderP'>{selectedPot ? potBarWidth(selectedPot.total || 0, selectedPot.target || 0).toFixed(2) : '0.00'}%</p>
                <p className='barInfoHolderP'>Target of ${selectedPot?.target || 0}</p>
              </div>

              <p className='budgetlabel'>Amount To Add</p>
              <input value={money}  onChange={handleMoneyAdding} onBlur={handleMoneyAdding}  className="categoryDropdown" type="text" placeholder='$ e.g. 400' />

              <button className='addBudgetBtn' onClick={addMoney}>
                Confirm Addition
              </button>

            </div>
          </div>
          {/*///////*/}

          </div>

          <div className='potTotalSaved'>
            <p className='potTotalSavedP'>Total Saved</p>
            <h2 className='potTotalSavedH2'>${pot.total ? pot.total.toFixed(2) : '0.00'}</h2>
          </div>

          <div className='potBarHolder'>
            <div className='potBarHolderBcg'></div>
            <div className='potBarHolderMain' style={{ backgroundColor: pot.theme, width: `${potBarWidth(pot.total, pot.target)}%`}}></div>
          </div>

          <div className='barInfoHolder'>
            <p className='barInfoHolderP'>{potBarWidth(pot.total, pot.target).toFixed(2)}%</p>
            <p className='barInfoHolderP'>Target of ${pot.target}</p>
          </div>

          <div className='potBtnHolder'>
            <button className='potBtn'  onClick={() => toggleAddMoney(pot)}>+ Add Money</button>
            <button className='potBtn'>Withdraw</button>
          </div>

        </div>

      ))}
    </section>
  )
}
