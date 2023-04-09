<template>
    <div class="left-panel">
        <!-- create a pie chart with female: 50, male: 100. Use warm colors -->
      <textarea v-model="prompt" placeholder="Enter your prompt here..."></textarea>
      <button @click="$emit('generateChart', prompt)">Generate Chart</button>
    </div>
  </template>
  
<script>
export default {
name: 'LeftPanel',
data() {
    return {
    prompt: '',
    };
},
};
</script>