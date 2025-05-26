import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
    const products = ref([]) // state
    const loading = ref(false) // state

    // actions
    async function fetchProducts() {
        try {
            loading.value = true;
            const response = await fetch("https://dummyjson.com/products");
            const data = await response.json();

            products.value = data.products;
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            loading.value = false;
        }
    }

    return { products, loading, fetchProducts }
})