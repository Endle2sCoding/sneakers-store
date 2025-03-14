<script setup>
import Card from "./Card.vue";

defineProps({
  items: Array
});
const emit = defineEmits(["addToFavorite", "addToCart"]);



</script>

<template>
  <div class="p-10">
    <div
      class="grid grid-cols-4 gap-5"
      v-auto-animate
    >
      <Card
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :image-url="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :is-added="false"
        :is-favorite="item.isFavorite"
        :onClickAdd="() => emit('addToCart', item)"
        :onClickFavorite="() => emit('addToFavorite', item)"
        :isAdded="item.isAdded"
      />
    </div>

  </div>
</template>
