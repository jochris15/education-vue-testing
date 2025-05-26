<template>
  <form
    class="p-5 mt-5 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)] bg-red-400"
  >
    <h1 class="text-2xl font-bold text-center mb-4">Add New Product</h1>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="label">
          <span class="font-bold">Name</span>
        </label>
        <input
          type="text"
          placeholder="Enter Name"
          class="bg-white rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        />
      </div>
      <div>
        <label class="label">
          <span class="font-bold">Description</span>
        </label>
        <input
          type="text"
          placeholder="Enter Description"
          class="bg-white rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        />
      </div>
      <div>
        <label class="label">
          <span class="font-bold">Price</span>
        </label>
        <input
          type="number"
          placeholder="Enter Price"
          class="bg-white rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        />
      </div>
      <div>
        <label class="label">
          <span class="font-bold">Stock</span>
        </label>
        <input
          type="number"
          placeholder="Enter Stock"
          class="bg-white rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        />
      </div>
      <div>
        <label class="label">
          <span class="font-bold">Image (URL)</span>
        </label>
        <input
          type="text"
          placeholder="Enter Image URL"
          class="bg-white rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
        />
      </div>
      <div>
        <label class="label">
          <span class="font-bold">Category</span>
        </label>
        <select
          class="bg-white rounded-2xl w-full px-3 py-2 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          name="category"
          id=""
        >
          <option>Select</option>
          <option>Select</option>
        </select>
      </div>
    </div>
    <div class="mt-5">
      <button
        class="w-full mt-5 justify-center py-2 px-4 border-2 border-black rounded-2xl text-sm font-medium text-white bg-gray-700 hover:bg-black shadow-[2px_2px_0px_rgba(0,0,0,1)]"
      >
        Add New Product
      </button>
    </div>
  </form>
</template>
