<script setup>
import Header from "@/components/Header.vue";
import CardList from "@/components/CardList.vue";
</script>

<template>
  <div class="w-4/5 m-auto bg-white  min-h-[calc(100vh-56px)] rounded-xl shadow-xl mt-14 ">
    <Header />
    <CardList />

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
