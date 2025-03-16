<script setup>
import InfoBlock from "./InfoBlock.vue";

import CartListItem from './CartListItem.vue';
import DrawerHeader from './DrawerHeader.vue';
import { computed, inject, ref } from "vue";
import axios from "axios";

const BASE_URL = `https://b93c3c2caba7db59.mokky.dev`;
const { cart, closeDrower } = inject('cart');
const props = defineProps({
  totalPrice: Number,
  vatPrice: Number,
});
const isCreatingOrder = ref(false);
const orderId = ref(null);

const createOrder = async () => {
  try {
    isCreatingOrder.value = true;
    const { data } = await axios.post(`${BASE_URL}/orders`, {
      items: cart.value,
      totalPrice: props.totalPrice
    });
    cart.value = [];
    orderId.value = data.id;
    return data;
  } catch (err) {
    console.log(err);
  } finally {
    isCreatingOrder.value = false;
  }
};
const disabledButton = computed(() => isCreatingOrder.value ? true : props.totalPrice ? false : true);
</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="flex flex-col bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <DrawerHeader />

    <div
      v-if="!totalPrice || orderId"
      class="h-full flex items-center"
    >
      <InfoBlock
        v-if="!totalPrice && !orderId"
        title="Cart is empty"
        description="Add at least one pair of sneakers to place an order"
        image-url="/package-icon.png"
      />
      <InfoBlock
        v-if="orderId"
        title="The order has been placed"
        :description="`Your order #${orderId} will be delivered by courier soon`"
        image-url="/order-success-icon.png"
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
          @click="createOrder"
          class="bg-lime-500 w-full rounded-xl py-4 text-white cursor-pointer transition disabled:bg-slate-400 disabled:cursor-auto hover:bg-lime-600 active:bg-lime-700 mt-4"
        >
          Place an order
        </button>
      </div>
    </div>

  </div>
</template>
