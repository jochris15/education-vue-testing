<script setup>
const props = defineProps({
  user: {
    type: Object,
  },
});

const { user } = props;
</script>

<template>
  <div class="flex flex-col justify-center items-start divide-y gap-4">
    <b>ID : {{ user.id }}</b>
    <b>Name : {{ user.name }}</b>
  </div>
</template>
