<template>
    <div class="right-panel">
      <hr class="mx-8 my-2"/>
      <div class="p-8 mx-auto w-full">
        <h2 class="text-2xl font-bold mb-6 text-gray-700 text-left">Chart</h2>
        <div ref="chartContainer"></div>
      </div>
    </div>
  </template>
  
  <script>
import vegaEmbed from 'vega-embed';

export default {
  name: 'RightPanel',
  props: ['chartData'],
  methods: {
    renderVegaLiteChart(chartData) {
      vegaEmbed(this.$refs.chartContainer, chartData).catch((error) => console.error(error));
    },
  },
  watch: {
    chartData(newValue) {
      if (newValue) {
        this.renderVegaLiteChart(newValue);
      }
    },
  },
};
  </script>