<script setup>
import InfoBlock from "./InfoBlock.vue";

import CartListItem from './CartListItem.vue';
import DrawerHeader from './DrawerHeader.vue';

const emit = defineEmits(['createOrder']);
defineProps({
  totalPrice: Number,
  vatPrice: Number,
  disabledButton: Boolean
});

</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="flex flex-col bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHeader />
    <div
      v-if="!totalPrice"
      class="h-full flex items-center"
    >
      <InfoBlock
        title="Cart is empty"
        description="Add at least one pair of sneakers to place an order"
        image-url="/package-icon.png"
      />
    </div>

    <div v-else>
      <CartListItem />
      <div class="flex flex-col gap-4 mb-3 mt-6">
        <div class="flex gap-2">
          <span>Total</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} rub.</b>
        </div>
        <div class="flex gap-2">
          <span>Tax 5%</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ vatPrice }} rub.</b>
        </div>
        <button
          :disabled="disabledButton"
          @click="() => emit('createOrder')"
          class="bg-lime-500 w-full rounded-xl py-4 text-white cursor-pointer transition disabled:bg-slate-400 disabled:cursor-auto hover:bg-lime-600 active:bg-lime-700 mt-4"
        >
          Place an order
        </button>
      </div>
    </div>

  </div>
</template>
