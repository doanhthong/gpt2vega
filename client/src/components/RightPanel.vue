<template>
    <div class="right-panel">
      <p>Right Panel: </p>
      <div ref="chartContainer"></div>
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