<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { id } = route.params;
const product = ref({});
const loading = ref(false);

async function fetchProduct() {
  try {
    loading.value = true;
    const response = await fetch(`https://dummyjson.com/product/${id}`);

    const data = await response.json();

    product.value = data;
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    loading.value = false;
  }
}

fetchProduct();
</script>

<template>
  <div class="flex flex-col items-center justify-center" v-if="loading">
    <img src="../assets/Bean Eater@1x-1.0s-200px-200px.svg" class="w-1/5" />
  </div>

  <div
    class="flex flex-start bg-yellow-400 border-2 border-black p-5 rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] h-full"
    v-else
  >
    <div class="flex justify-center items-center">
      <img
        :src="product.thumbnail"
        alt="product image"
        class="border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
      />
    </div>
    <div class="flex mx-10 flex-col w-1/2 justify-between">
      <b class="text-4xl mb-5">{{ product.title }}</b>
      <p class="h-full">{{ product.description }}</p>
      <RouterLink
        to="/home"
        class="w-1/5 mt-5 py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-gray-700 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)] text-left"
      >
        Back to Home
      </RouterLink>
    </div>
  </div>
</template>
