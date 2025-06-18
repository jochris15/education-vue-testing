<script setup>
import { ref } from "vue";
import UserCard from "@/components/UserCard.vue";

const users = ref([]);
const loading = ref(false);

async function fetchUsers() {
  try {
    loading.value = true;
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const data = await response.json();

    users.value = data;
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
}

fetchUsers();
</script>

<template>
  <div>
    <div class="flex flex-col items-center justify-center h-screen" v-if="loading">
      <img src="../assets/Bean Eater@1x-1.0s-200px-200px.svg" class="w-1/3" />
    </div>

    <div class="flex flex-col items-center justify-center" v-else>
      <b class="text-4xl mb-10">User List</b>

      <main class="my-5 bg-white grid grid-cols-4 gap-5">
        <div
          class="h-full bg-yellow-400 border-2 border-black p-5 rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          v-for="user in users"
          :key="user.id"
        >
          <UserCard :user="user" />
        </div>
      </main>
    </div>
  </div>
</template>
