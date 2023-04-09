<template>
    <div id="appmain" class="h-screen flex">
        <LeftPanel class="flex-1"  @generateChart="generateChart" />
        <!-- <div v-if="isLoading" class="loading-indicator">
            Loading...
        </div> -->
        <RightPanel class="flex-1"  :chartData="chartData" />
    </div>
</template>
  
<script>
import LeftPanel from './LeftPanel.vue';
import RightPanel from './RightPanel.vue';

export default {
    name: 'AppMain',
    components: { LeftPanel, RightPanel },
    data() {
        return {
            chartData: null,
            isLoading: false,
        };
    },
    methods: {
        async generateChart(prompt) {
            if (!prompt || prompt.trim() === "") {
                console.error("Prompt is empty or invalid");
                return;
            }

            this.isLoading = true;

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

            this.isLoading = false;
        },
    },
};
</script>