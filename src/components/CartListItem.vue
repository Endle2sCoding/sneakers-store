<script setup>
import CartItem from './CartItem.vue';
</script>

<template>
  <div class="flex flex-col flex-1 gap-4">
    <CartItem
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="1205"
    />
    <CartItem
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="1205"
    />
    <CartItem
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="1205"
    />
    <CartItem
      image-url="/sneakers/sneakers-1.jpg"
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      :price="1205"
    />
  </div>
</template>
