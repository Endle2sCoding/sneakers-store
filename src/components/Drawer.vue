<script setup>
import CartListItem from './CartListItem.vue';
import DrawerHeader from './DrawerHeader.vue';
defineProps({
  isOpen: Boolean
});
</script>

<template>
  <div class="hidden top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class=" flex flex-col justify-between bg-white w-96 h-full hidden right-0 top-0 z-20 p-8">
    <div>
      <DrawerHeader />
      <CartListItem />
    </div>

    <div class="flex flex-col gap-4 mb-3">
      <div class="flex gap-2">
        <span>Total</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>12900 rub.</b>
      </div>
      <div class="flex gap-2">
        <span>Tax 5%</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>1074 rub.</b>
      </div>
      <button
        disabled
        class="bg-lime-500 w-full rounded-xl py-4 text-white cursor-pointer transition disabled:bg-slate-400 disabled:cursor-auto hover:bg-lime-600 active:bg-lime-700 mt-4"
      >
        Place an order
      </button>
    </div>
  </div>
</template>
