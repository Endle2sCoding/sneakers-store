<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue';
const { cart, removeFromCart } = inject('cart');
</script>


<template>
  <div
    v-auto-animate
    class="flex flex-col flex-1 gap-4 justify-between"
  >
    <CartItem
      v-for="item in cart"
      :image-url="item.imageUrl"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      @onClickRemove="() => removeFromCart(item)"
    />
  </div>
</template>
