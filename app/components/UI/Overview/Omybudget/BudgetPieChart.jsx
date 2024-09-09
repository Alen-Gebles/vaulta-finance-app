import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetPieChart = ({ spendingInSelectedCategories, budgetsPerCategory }) => {
  
  const data = {
    labels: Object.keys(spendingInSelectedCategories),
    datasets: [{
      data: Object.values(spendingInSelectedCategories),
      backgroundColor: Object.keys(spendingInSelectedCategories).map(category => budgetsPerCategory[category].theme),
      borderColor: 'rgba(255, 255, 255, 0.5)',
      borderWidth: 0,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      }
    },
  };

  return <div className='budgetPie'>
          <Pie data={data} options={options} />
        </div>
  
};

export default BudgetPieChart;
