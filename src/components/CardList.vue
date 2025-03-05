<script setup>
import Card from "./Card.vue";

const onClickAdd = () => {
  alert(111);
};
const onClickAFavorite = () => { }


</script>

<template>
  <div class="p-10">
    <h2 class="text-3xl font-bold mb-8">All sneakers</h2>
    <div class="grid grid-cols-4 gap-5 ">
      <Card
        image-url="/sneakers/sneakers-1.jpg"
        title="Мужские Кроссовки Nike Blazer Mid Suede"
        :price="1205"
        :is-added="false"
        :is-favourite="false"
        :onClickAdd="onClickAdd"
        :onClickAFavorite="onClickAFavorite"
      />

    </div>

  </div>
</template>