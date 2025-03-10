<script setup>
import Card from "./Card.vue";

defineProps({
  items: Array
});
const emit = defineEmits(["addToFavorite"]);

const onClickAdd = () => {
  alert(111);
};


</script>

<template>
  <div class="p-10">
    <div class="grid grid-cols-4 gap-5">
      <Card
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :image-url="item.imageUrl"
        :title="item.title"
        :price="item.price"
        :is-added="false"
        :is-favorite="item.isFavorite"
        :onClickAdd="onClickAdd"
        :onClickFavorite="() => emit('addToFavorite', item)"
      />
    </div>

  </div>
</template>
