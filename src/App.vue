<script setup>
import Header from "@/components/Header.vue";
import CardList from "@/components/CardList.vue";
import Drawer from "./components/Drawer.vue";
import { onMounted, reactive, ref, watch, provide, computed } from "vue";
import axios from "axios";
const BASE_URL = `https://b93c3c2caba7db59.mokky.dev`;
const items = ref([]);
const cart = ref([]);
const isCreatingOrder = ref(false);

const cartDisabledButton = computed(() => isCreatingOrder.value ? true : totalPrice.value ? false : true);

const drawerOpen = ref(false);

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0));
const vatPrice = computed(() => Math.round((totalPrice.value / 100) * 5));

const closeDrawer = () => {
  drawerOpen.value = false;
};
const openDrawer = () => {
  drawerOpen.value = true;
};


const filters = reactive({
  sortBy: "name",
  searchQuery: ""
});

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

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item);
  } else {
    removeFromCart(item);
  }
};

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};
const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value;
};

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`${BASE_URL}/favorites/`);

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id);

      if (!favorite) {
        return item;
      }

      return {
        ...item,
        isFavorite: true,
        favoriteId: favorite.id
      };
    });
  } catch (err) {
    console.log(err);
  }

};
const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      };
      item.isFavorite = true;
      const { data } = await axios.post(`${BASE_URL}/favorites`, obj);
      item.favoriteId = data.id;
    } else {


      item.isFavorite = false;
      await axios.delete(`${BASE_URL}/favorites/${item.favoriteId}`);
      item.favoriteId = null;
    }
  } catch (error) {
    console.log(error);

  }

};
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    };
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }
    const { data } = await axios.get(`${BASE_URL}/items?`, { params });
    items.value = data.map(itemData => ({
      ...itemData,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }));

  } catch (error) {
    console.log(error);
  }
  // fetch("https://b93c3c2caba7db59.mokky.dev/items").then((res) => res.json()).then(data => console.log("data", data)
  // );

};


onMounted(async () => {
  await fetchItems();
  await fetchFavorites();
});
watch(filters, fetchItems);
provide("addToFavorite", addToFavorite);
provide("cart", {
  cart,
  openDrawer,
  closeDrawer,
  addToCart,
  removeFromCart,
});
</script>
<template>
  <Drawer
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
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold ">All sneakers</h2>
        <div class="flex gap-4">
          <select
            @change="onChangeSelect"
            name=""
            id=""
            class="py-2 px-3 border-gray-200 -md outline rounded-md"
          >
            <option value="name">Name</option>
            <option value="price">Price (cheap)</option>
            <option value="-price">Price (expensive)</option>
          </select>

          <div class="relative">
            <img
              class="absolute left-3 top-3"
              src="/search.svg"
              alt="search"
            >
            <input
              @input="onChangeSearchInput"
              class="border border-gray-200 rounded-md py-2 pl-9 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Search"
            >
          </div>
        </div>

      </div>
    </div>
    <div>

      <CardList
        :items="items"
        @addToFavorite="addToFavorite"
        @addToCart="onClickAddPlus"
      />
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
