<template>
  <!-- navbar -->
  <nav
    class="sticky top-0 z-10 p-3 bg-purple-400 border-2 border-black rounded-2xl shadow-[2px_2px_0px_rgba(0,0,0,1)]"
  >
    <div class="flex justify-between items-center">
      <div>
        <RouterLink to="/counter" class="text-2xl font-bold px-6 cursor-pointer">
          <span>Counter</span>
        </RouterLink>
        <RouterLink to="/counter-pinia" class="text-2xl font-bold px-6 cursor-pointer">
          <span>Pinia</span>
        </RouterLink>
        <RouterLink to="/users" class="text-2xl font-bold px-6 cursor-pointer">
          <span>User List</span>
        </RouterLink>
        <RouterLink to="/add" class="text-2xl font-bold px-6 cursor-pointer">
          <span>Add User</span>
        </RouterLink>
      </div>
    </div>
  </nav>
  <br />
</template>
