<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isAdded: Boolean,
  isFavourite: Boolean,
  onClickAdd: Function,
  onClickAFavorite: Function,
});

</script>
<template>
  <div class="relative border border-slate-100 rounded-3xl p-8 cursor-pointer 
        transition hover:-translate-y-2 hover:shadow-xl
        bg-white
        ">
    <img
      @click="onClickAFavorite"
      class="absolute top-8 left-8"
      :src="!isFavourite ? '/like-1.svg' : '/like-2.svg'"
      :alt="!isFavourite ? 'like-1' : 'like-2'"
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
      <div class="flex flex-col mt-5"><span class="text-slate-400">Price</span>{{ price }} rub.<span></span></div>
      <img
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="plus"
      >
    </div>
  </div>
</template>