<script setup>
import CardList from "@/components/CardList.vue";
import axios from "axios";
import { onMounted, ref } from "vue";
const BASE_URL = `https://b93c3c2caba7db59.
mokky.dev`;
const favorites = ref([]);

onMounted(
  async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/favorites?_relations=items`);
      favorites.value = data.map(obj => obj.item);
      console.log("data", data);

    } catch (error) {
      console.log(error);
    }
  }
);
</script>
<template>
  <h2 class="text-3xl font-bold "> My bookmarks</h2>

  <CardList
    :items="favorites"
    isFavorites
  />
</template>
