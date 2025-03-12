<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue'
;
const { cart, removeFromCart } = inject('cart');

// const onClickremove = () => {
//   addToCart(item);
// };
</script>


<template>
  <div
    v-for="item in cart"
    :key="item.id"
    class="flex flex-col flex-1 gap-4"
  >
    <CartItem
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      @onClickRemove="() => removeFromCart(item)"
    />

  </div>
</template>
