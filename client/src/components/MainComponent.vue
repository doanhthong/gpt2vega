<template>
    <div id="app">
      <LeftPanel @generateChart="generateChart" />
      <RightPanel :chartData="chartData" />
    </div>
  </template>
  
  <script>
  import LeftPanel from './LeftPanel.vue';
  import RightPanel from './RightPanel.vue';
  
  export default {
    name: 'App',
    components: { LeftPanel, RightPanel },
    data() {
      return {
        chartData: null,
      };
    },
    methods: {
      async generateChart(prompt) {
        try {
            
            // Call the backend API to generate the VegaLite chart data
            const response = await fetch('http://localhost:3000/api/generate-chart', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt }),
            });
            

            // Check if the response is ok (status code in the range 200-299)
            if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
            }

            this.chartData = await response.json();
            console.log('Chart data:', this.chartData);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
      },
    },
  };
  </script>