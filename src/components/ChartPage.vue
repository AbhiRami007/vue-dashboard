<template>
    <div :class="'data-container'">
      <h1>Data Visualization Dashboard</h1>
  
      <!-- Line Chart -->
      <div :class="'chart'">
        <h2>Monthly Sales Data (Line Chart)</h2>
        <line-chart :data="lineChartData" />
      </div>
  
      <!-- Bar Chart -->
      <div :class="'chart'">
        <h2>Revenue Comparison (Bar Chart)</h2>
        <bar-chart :data="barChartData" :options="barChartOptions" />
      </div>
  
      <!-- Pie Chart -->
      <div :class="'chart'">
        <h2>Product Distribution (Pie Chart)</h2>
        <pie-chart :data="pieChartData" />
      </div>
    </div>
  </template>
  
  <script>
  import { LineChart, BarChart, PieChart } from "vue-chartkick";
  import "chart.js/auto"; // Import Chart.js globally
  
  export default {
    components: {
      LineChart,
      BarChart,
      PieChart
    },
    data() {
      return {
        lineChartData: {
          January: 1000,
          February: 1200,
          March: 1500,
          April: 1300,
          May: 1800,
          June: 2000,
          July: 2200,
          August: 2500,
          September: 2700,
          October: 3000,
          November: 3200,
          December: 3500
        },
        lineChartOptions: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Month"
              }
            },
            y: {
              title: {
                display: true,
                text: "Sales ($)"
              }
            }
          }
        },
        barChartData: {
          "Product A": 5000,
          "Product B": 8000,
          "Product C": 7000
        },
        barChartOptions: {
          responsive: true,
          title: {
            display: true,
            text: "Revenue Comparison"
          }
        },
        pieChartData: {
          "Product A": 50,
          "Product B": 30,
          "Product C": 20
        }
      };
    },
    mounted() {
      console.log('Charts are mounted!');
    }
  };
  </script>
  
  <style scoped>
  /* Styles for chart layout */
  .data-container {
  margin: 5rem;
  margin-top: 2rem;
  background-color: #f3f3f3;
  padding: 2rem;
  width: 50%;
  margin-left: 20%;
}
.data-container > h1 {
  color: #f66e04;
  text-align: center;
}
.chart{
    padding: 20px;
    background-color: #fff;
}
  h1 {
    text-align: center;
    margin-bottom: 30px;
  }
  
  div {
    margin-bottom: 50px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  </style>
  