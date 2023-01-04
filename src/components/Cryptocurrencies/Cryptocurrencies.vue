<template>
  <section class="footer-container-gradient text-[#fbfdfe]">
    <div class="w-full py-6 sm:py-10 flex flex-col gap-4 sm:gap-5">
      <div class="flex gap-3 justify-between items-center">
        <h4
          class="text-2xl font-semibold ml-5 sm:ml-8 md:ml-10 lg:ml-16 truncate"
        >
          {{ heading }}
        </h4>
        <button
          class="flex gap-1.5 items-center bg-[#343435] py-1 pl-2.5 pr-1.5 rounded-md shadow text-sm text-[#acafb3] mr-5 sm:mr-8 md:mr-10 lg:mr-16 hover:bg-[#3b3b3c] transition-colors duration-200"
        >
          Search
          <div class="bg-[#272728] px-1.5 rounded">⌘K</div>
        </button>
      </div>
      <CryptocurrenciesSwiper
        :isFetching="isFetching"
        :data="cryptocurrencies"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";
import CryptocurrenciesSwiper from "./../Swiper/CryptocurrenciesSwiper.vue";

defineProps({
  heading: String,
});

const toast = useToast();
const isFetching = ref(true);
const cryptocurrencies = ref([]);

const getTrendingCryptocurrencies = async (limit = 30) => {
  axios
    .get(
      `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${30}&tsym=USD`
    )
    .then((res) => {
      cryptocurrencies.value = [...res.data.Data];
      setTimeout(() => {
        isFetching.value = false;
      }, 1_000);
    })
    .catch((err) => {
      toast.error("Something went wrong");
      console.log(err);
    });
};
getTrendingCryptocurrencies();
</script>

<style></style>
