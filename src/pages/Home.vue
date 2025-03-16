<script setup>
import CardList from '@/components/CardList.vue';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { inject, onMounted, provide, reactive, ref, watch } from 'vue';
const BASE_URL = `https://b93c3c2caba7db59.mokky.dev`;

const items = ref([]);
const filters = reactive({
  sortBy: "name",
  searchQuery: ""
});


const { cart, addToCart, removeFromCart } = inject('cart');

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
const onChangeSearchInput = debounce((event) => {
  filters.searchQuery = event.target.value;
}, 300);

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        item_id: item.id
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
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`${BASE_URL}/favorites/`);

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.item_id === item.id);

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

onMounted(async () => {
  const localCart = localStorage.getItem('cart');
  cart.value = localCart ? JSON.parse(localCart) : [];

  await fetchItems();
  await fetchFavorites();

  items.value = items.value.map(item => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }));
});
watch(filters, fetchItems);

provide("addToFavorite", addToFavorite);
provide("items", items);

</script>
<template>

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

  <CardList
    :items="items"
    @addToFavorite="addToFavorite"
    @addToCart="onClickAddPlus"
  />
</template>
