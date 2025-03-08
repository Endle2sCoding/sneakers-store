<script setup>
import Header from "@/components/Header.vue";
import CardList from "@/components/CardList.vue";
import Drawer from "./components/Drawer.vue";
import { onMounted, reactive, ref, watch } from "vue";
import axios from "axios";
const isOpen = ref(false);
const items = ref([]);
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
const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy,
    };
    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`;
    }
    const { data } = await axios.get(`https://b93c3c2caba7db59.mokky.dev/items?`, { params });
    items.value = data;

  } catch (error) {
    console.log(error);
  }
  // fetch("https://b93c3c2caba7db59.mokky.dev/items").then((res) => res.json()).then(data => console.log("data", data)
  // );

};

onMounted(async () => {
  fetchItems();
});
watch(filters, async () => {
  fetchItems();
});
;</script>

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

      <CardList :items="items" />
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
