<template>
    <div>
    <h1 class="text-4xl font-bold text-blue-500 mb-8 ">GPT2Vega</h1>
        <div class="bg-white shadow-md rounded rounded-lg p-6 mx-auto container mb-20 border border-gray-100">
            <div id="appmain">
                <LeftPanel  @generateChart="generateChart" />
                <div v-if="isLoading" class="loading-indicator text-left flex items-center ml-8">
                    <svg
                        class="animate-spin h-5 w-5 mr-3 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 1.962.421 3.8 1.176 5.291l2.824-1.145z"
                    ></path>
                    </svg>
                    Loading...
                </div>
                <RightPanel  :chartData="chartData" />
                

            </div>
        </div>
    </div>
</template>

<style lang="scss">
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.container {
    max-width: 1000px;
}
#appmain {
    min-height: 600px;
}
</style>
  
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