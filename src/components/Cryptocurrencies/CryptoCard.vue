<template>
  <div
    v-bind:class="{ 'card-loading-animation--is-loading': isFetching }"
    class="card-loading-animation rounded-xl bg-[#67696e] bg-opacity-25 px-6 py-7 flex flex-col gap-3 min-w-[185px] transition-colors duration-300 shadow-sm cursor-pointer select-none hover:bg-[#404248]"
    :class="{ 'bg-[#c0e7e8] bg-opacity-100': active }"
  >
    <div class="flex flex-col gap-1">
      <div
        class="card-loading-animation__img rounded-full w-9 h-9 bg-black p-1 overflow-hidden"
      >
        <img
          v-if="!isFetching"
          :src="'https://cryptocompare.com' + icon"
          alt="logo"
          class="w-full h-full grayscale rounded-full"
        />
      </div>
      <h3
        class="card-loading-animation__heading font-semibold text-lg text-white text-opacity-60 truncate"
        :class="{ 'text-[#3d444b] text-opacity-100': active }"
      >
        {{ name }}
      </h3>
    </div>
    <div class="flex flex-col gap-0.5">
      <div
        class="card-loading-animation__price text-[1.075rem] text-[#cfeced]"
        :class="{ 'text-[#3d444b] text-opacity-90': active }"
      >
        <span v-if="!isFetching" class="font-medium">$</span
        ><span v-bind:class="{ 'text-transparent': isFetching }">{{
          price
        }}</span>
      </div>
      <div
        class="card-loading-animation__change flex gap-0.5 text-sm"
        :class="{ 'text-[#3d444b] text-opacity-75': active }"
      >
        <div v-if="!isFetching" class="mr-1">
          <ArrowDownIcon v-if="changePercent[0] === '-'" />
          <ArrowUpIcon v-else />
        </div>
        <div
          class="text-[#c0e7e8]"
          v-bind:class="{ 'text-[#3d444b] text-opacity-60': active }"
        >
          <span>{{ changePercent }}</span
          ><span v-if="!isFetching">%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ArrowUpIcon from "../Icons/ArrowUpIcon.vue";
import ArrowDownIcon from "../Icons/ArrowDownIcon.vue";

const props = defineProps({
  isFetching: Boolean,
  name: String,
  icon: String,
  price: Number,
  changePercent: String,
  symbol: String,
  active: Boolean,
});
</script>

<style>
.card-loading-animation.card-loading-animation--is-loading {
  background: linear-gradient(110deg, #4d4e52 8%, #56585c 18%, #4d4e52 33%);
}

.card-loading-animation.card-loading-animation--is-loading
  .card-loading-animation__img {
  background: linear-gradient(110deg, #5d5e62 8%, #56585c 18%, #5d5e62 33%);
}

.card-loading-animation.card-loading-animation--is-loading
  .card-loading-animation__heading {
  transform: scaleY(0.9);
  background: linear-gradient(110deg, #5d5e62 8%, #56585c 18%, #5d5e62 33%);
  border-radius: 3px;
}

.card-loading-animation.card-loading-animation--is-loading
  .card-loading-animation__price {
  transform: scaleY(0.9);
  width: 5rem;
  background: linear-gradient(110deg, #5d5e62 8%, #56585c 18%, #5d5e62 33%);
  border-radius: 3px;
}

.card-loading-animation.card-loading-animation--is-loading
  .card-loading-animation__change {
  transform: scaleY(0.9);
  width: 2.75rem;
  background: linear-gradient(110deg, #5d5e62 8%, #56585c 18%, #5d5e62 33%);
  border-radius: 3px;
}

.card-loading-animation.card-loading-animation--is-loading,
.card-loading-animation.card-loading-animation--is-loading
  .card-loading-animation__img,
.card-loading-animation.card-loading-animation--is-loading
  .card-loading-animation__heading,
.card-loading-animation.card-loading-animation--is-loading
  .card-loading-animation__price,
.card-loading-animation.card-loading-animation--is-loading
  .card-loading-animation__change {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
