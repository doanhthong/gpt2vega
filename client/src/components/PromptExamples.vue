<template>
    <div class="w-full my-2 text-gray-400 ">
      <div @click="toggle" class="w-full text-left hover:cursor-pointer my-2">
        <span
            class="transition duration-300 ease-in-out inline-block"
            :class="{ 'transform rotate-90': open }"
        >
        ▸   
        </span>
        Examples

      </div>
      <ul v-if="open" class="list-disc pl-12 mt-2 ">
        <li>Create a pie chart for f: 100, m: 200. Use warm colors.</li>
        <li></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        open: false,
      };
    },
    methods: {
      toggle() {
        this.open = !this.open;
      },
    },
  };
  </script>