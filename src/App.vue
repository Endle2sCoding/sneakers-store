<script setup>
import Header from "@/components/Header.vue";
import DrawerBlock from "./components/DrawerBlock.vue";
import { ref, watch, provide, computed } from "vue";
import axios from "axios";
import { RouterView } from "vue-router";

const BASE_URL = `https://b93c3c2caba7db59.mokky.dev`;
// Cart start
const cart = ref([]);
const drawerOpen = ref(false);
const isCreatingOrder = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value / 100) * 5));

const cartDisabledButton = computed(() => isCreatingOrder.value ? true : totalPrice.value ? false : true);

const closeDrawer = () => {
  drawerOpen.value = false;
};
const openDrawer = () => {
  drawerOpen.value = true;
};

const addToCart = (item) => {
  cart.value.push(item);
  item.isAdded = true;
};
const removeFromCart = (item) => {
  cart.value.splice(
    cart.value.indexOf(item), 1
  );
  item.isAdded = false;
};

const createOrder = async () => {
  try {
    isCreatingOrder.value = true;
    const { data } = await axios.post(`${BASE_URL}/orders`, {
      items: cart.value,
      totalPrice: totalPrice.value
    });
    cart.value = [];
    return data;
  } catch (err) {
    console.log(err);
  } finally {
    isCreatingOrder.value = false;
  }
};


watch(cart, () => {
  localStorage.setItem('cart', JSON.stringify(cart.value));
}, { deep: true });

provide("cart", {
  cart,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart,
});
provide("app", BASE_URL);
// Cart end
</script>
<template>
  <DrawerBlock
    v-if="drawerOpen"
    :totalPrice="totalPrice"
    :vatPrice="vatPrice"
    @createOrder="createOrder"
    :disabledButton="cartDisabledButton"
  />
  <div class="w-4/5 m-auto bg-white  min-h-[calc(100vh-56px)] rounded-xl shadow-xl mt-14 ">
    <Header
      :totalPrice="totalPrice"
      @openDrawer="openDrawer"
    />


    <div class="p-10">
      <RouterView />
    </div>

  </div>
</template>

<style>
@import "tailwindcss";

body {
  background: lightgrey;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
