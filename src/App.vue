<script setup>
import Header from "@/components/Header.vue";
import CardList from "@/components/CardList.vue";
import Drawer from "./components/Drawer.vue";
import { onMounted, reactive, ref, watch, provide } from "vue";
import axios from "axios";
const isOpen = ref(false);
const items = ref([]);
// const favorites = ref([]);
const filters = reactive({
  sortBy: "name",
  searchQuery: ""
});

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value;
};
const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value;
};

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get(`https://b93c3c2caba7db59.mokky.dev/favorites`);
    items.value = items.value.map(item => {
      const favorite = data.find(d => item.id === d.parentId);
      if (!favorite) {
        return item;
      }
      return {
        ...item,
        isFavorite: true,
        parentId: data.id
      };
    }
    );

  } catch (error) {
    console.log(error);
  }
};
const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      console.log(item);
      const obj = {
        parentId: item.id
      };
      item.isFavorite = true;
      const { data } = await axios.post(`https://b93c3c2caba7db59.mokky.dev/favorites`, obj);
      item.favoriteId = data.id;
      console.log("item.favoriteId", item.favoriteId);
      console.log("data", data.id);
    } else {
      console.log("item.favoriteId", item.favoriteId);
      console.log("item", item);

      item.isFavorite = false;
      await axios.delete(`https://b93c3c2caba7db59.mokky.dev/favorites/${item.favoriteId}`);
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
    const { data } = await axios.get(`https://b93c3c2caba7db59.mokky.dev/items?`, { params });
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
</script>
<template>
  <Drawer :isOpen="isOpen" />
  <div class="w-4/5 m-auto bg-white  min-h-[calc(100vh-56px)] rounded-xl shadow-xl mt-14 ">
    <Header />
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
