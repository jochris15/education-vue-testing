<script setup>
import { ref } from "vue";

defineProps({
  message: {
    type: String,
  },
});

const count = ref(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <p class="text-4xl">Count : {{ count }}</p>
    <p class="text-4xl">message : {{ message }}</p>
    <div class="flex gap-5">
      <button
        class="w-full mt-5 justify-center py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-gray-700 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        @click="increment"
        id="increment"
      >
        Increment
      </button>
      <button
        class="w-full mt-5 justify-center py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-gray-700 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        @click="decrement"
        id="decrement"
      >
        Decrement
      </button>
    </div>
  </div>
</template>
