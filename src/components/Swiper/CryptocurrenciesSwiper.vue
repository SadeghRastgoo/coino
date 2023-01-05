<template>
  <swiper
    :space-between="20"
    :slides-offset-before="windowInnerWidth"
    :breakpoints="{
      300: {
        width: 400,
        slidesPerView: 2,
      },
      450: {
        width: 400,
        slidesPerView: 2,
      },
    }"
    :scrollbar="{ draggable: true }"
    class="h-full no-scrollbar"
  >
    <swiper-slide
      v-if="isFetching === false"
      v-for="el in props.data"
      class="h-full"
    >
      <CryptoCard
        @click="handleCryptoCardClick([el.CoinInfo.Name, el.CoinInfo.FullName])"
        :name="el.CoinInfo.FullName"
        :icon="el.CoinInfo.ImageUrl"
        :price="el.RAW.USD.PRICE"
        :changePercent="el.DISPLAY.USD.CHANGEPCT24HOUR"
        :symbol="el.CoinInfo.Name"
      />
    </swiper-slide>

    <!-- Loading Placeholder Card -->
    <swiper-slide v-else v-for="index in 8" :key="index" class="h-full">
      <CryptoCard
        :isFetching="isFetching"
        :name="'&nbsp;'"
        :icon="'&nbsp;'"
        :price="0"
        :changePercent="'&nbsp;'"
      />
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { ref } from "vue";
import { getCurrentInstance } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import CryptoCard from "../Cryptocurrencies/CryptoCard.vue";
import "swiper/css";

const emit = defineEmits(["clickedCrypto"]);
const props = defineProps(["data", "isFetching"]);
const windowInnerWidth = ref(window.innerWidth > 1023 ? 64 : 20);

const handleCryptoCardClick = (cryptoName) => {
  emit("clickedCrypto", cryptoName);
};
</script>
