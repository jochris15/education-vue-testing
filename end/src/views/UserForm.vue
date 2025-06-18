<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  username: "",
  email: "",
});

const message = ref("");

async function addUser() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(form.value),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    message.value = `Succeed add new user ${data.username}`;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div>
    <form
      class="p-5 mt-5 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-red-400"
      @submit.prevent="addUser"
    >
      <h1 class="text-2xl font-bold text-center mb-4">Add New User</h1>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="label">
            <span class="font-bold">Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter Name"
            class="w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white"
            v-model="form.name"
            id="name"
          />
        </div>
        <div>
          <label class="label">
            <span class="font-bold">Username</span>
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            class="w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white"
            v-model="form.username"
            id="username"
          />
        </div>
      </div>
      <div class="mt-5">
        <div class="mb-5">
          <label class="label">
            <span class="font-bold">Email</span>
          </label>
          <input
            type="email"
            placeholder="Enter Email"
            class="w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-white"
            v-model="form.email"
            id="email"
          />
        </div>
        <button
          class="w-full mt-5 justify-center py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-gray-700 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        >
          Add New User
        </button>
      </div>
    </form>

    <div class="mt-20 flex justify-center items-center">
      <b class="text-2xl">{{ message }}</b>
    </div>
  </div>
</template>
