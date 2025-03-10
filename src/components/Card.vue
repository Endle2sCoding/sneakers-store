<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isAdded: Boolean,
  isFavorite: Boolean,
  onClickAdd: Function,
  onClickFavorite: Function,
});

</script>
<template>
  <div class="relative border border-slate-100 rounded-3xl p-8 cursor-pointer
        transition hover:-translate-y-2 hover:shadow-xl
        bg-white
        ">
    <img
      @click="onClickFavorite"
      class="absolute top-8 left-8"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      :alt="!isFavorite ? 'like-1' : 'like-2'"
    >

    <img
      :src="!isAdded ? '/plus.svg' : '/checked.svg'"
      alt="plus"
    >

    <img
      :src="imageUrl"
      alt="sneakers"
    >
    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between">
      <div class="flex flex-col mt-5"><span class="text-slate-400">Price</span><span>{{ price }} rub.</span></div>
      <img
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="plus"
      >
    </div>
  </div>
</template>
