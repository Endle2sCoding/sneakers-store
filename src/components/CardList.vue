<script setup>
import Card from "./Card.vue";

const onClickAdd = () => {
  alert(111);
};
const onClickAFavorite = () => { };
defineProps({
  items: Array
})

</script>

<template>
  <div class="p-10">
    <div class="grid grid-cols-4 gap-5">
      <Card
        v-for="item in items"
        :key="item.id"
        :image-url="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :is-added="false"
        :is-favorite="item.isFavorite"
        :onClickAdd="onClickAdd"
        :onClickAFavorite="onClickAFavorite"
      />
    </div>

  </div>
</template>
