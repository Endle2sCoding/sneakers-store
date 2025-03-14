<script setup>
const emit = defineEmits(["openDrawer"]);
defineProps({
  totalPrice: Number,
});
</script>
<template>
  <header class="flex justify-between border-b border-slate-300 py-8 px-10">
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img
          class="w-10"
          src="/logo.png"
          alt="logo"
        >
        <div>
          <h2 class="text-xl font-bold uppercase">Sneakers</h2>
          <p class="text-slate-400">Best sneaker store</p>
        </div>
      </div>
    </RouterLink>

    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black"
      >
        <img
          src="/cart.svg"
          alt="cart"
        >
        <b>{{ totalPrice }}.</b>
      </li>
      <RouterLink to="/favorites">
        <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
          <img
            src="
    /heart.svg"
            alt="cart"
          >

          <span> Bookmarks</span>
        </li>
      </RouterLink>
      <li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
        <img
          src="
    /profile.svg"
          alt="cart"
        >
        <span>Profile</span>
      </li>
    </ul>
  </header>

</template>
