<template>
  <div class="left-panel">
    <div class="p-8 mx-auto text-left w-full">
        <h2 class="text-2xl font-bold mb-1 text-gray-700">Input your prompt</h2>
        <!-- create a pie chart with female: 50, male: 100. Use warm colors -->
        <PromptExamples />

        <textarea
        v-model="prompt"
        placeholder="E.g. Create a pie chart for f: 100, m: 200. Use warm colors."
        class="shadow appearance-none border rounded w-full py-2 my-5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
        ></textarea>

        <button
        @click="$emit('generateChart', prompt)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
        >
        Generate Chart
        </button>
    </div>
  </div>
</template>
  
<script>
import PromptExamples from './PromptExamples.vue';

export default {
  name: "LeftPanel",
  components :{ PromptExamples },
  data() {
    return {
      prompt: "",
    };
  },
};
</script>