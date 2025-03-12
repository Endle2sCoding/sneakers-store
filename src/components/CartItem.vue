<script setup>
const emit = defineEmits(["onClickRemove"]);
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
});
</script>
<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4 mt-2">
    <img
      class="w-[70px] h-[70px]"
      :src="imageUrl"
      :alt="title"
    >

    <div class="flex flex-col flex-1 mt-2">
      <p class=""> {{ title }}</p>
      <div class="flex justify-between mt-2">
        <b class="text-bold flex-1">
          {{ price }} rub.
        </b>
        <img
          @click="emit('onClickRemove')"
          class="w-8 h-8 cursor-pointer transition opacity-70 hover:opacity-100"
          src="/close.svg"
          alt="close"
        >
      </div>
    </div>

  </div>
</template>;
