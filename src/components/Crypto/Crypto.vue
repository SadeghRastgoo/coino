<template>
  <section class="relative shadow-lg text-[#4f5054]">
    <div
      class="relative z-10 w-11/12 mx-auto max-w-7xl pt-6 pb-10 h-full flex flex-col justify-between gap-5"
    >
      <header>
        <h2 class="text-xl font-medium">
          <span>{{ name }}</span>
          <span class="text-xs text-[#7d7d7d] relative bottom-[1.3px] left-1"
            >/ {{ symbol }}</span
          >
        </h2>
      </header>
      <div>
        <div
          class="price-text-gradient flex text-7xl md:text-[7.5rem] justify-center lg:text-[10rem] text-center font-medium"
        >
          {{ symbolData.price }}
        </div>
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 max-w-6xl w-full mx-auto"
      >
        <!-- Detail 1 -->
        <div class="flex flex-col gap-1.5 text-center justify-center">
          <h5 class="font-medium text-[#2e3c42]">Price Change</h5>
          <div>
            <div class="text-[#26272b] font-medium">
              <span>{{ symbolData.change24Hour }}</span>
            </div>
            <div class="flex gap-1 justify-center text-[#26272b] font-medium">
              <span>
                <ArrowUpIcon />
              </span>
              <span>{{ symbolData.change24HourPct }}<span>%</span></span>
            </div>
          </div>
        </div>
        <!-- Detail 2 -->
        <div class="flex flex-col gap-1.5 text-center justify-center">
          <h5 class="font-medium text-[#2e3c42]">
            24h <span class="text-[#168555]">High</span>/<span
              class="text-[#a9484e]"
              >Low</span
            >
          </h5>
          <div>
            <div class="text-[#168555] font-medium">
              <span>{{ symbolData.low24Hour }}</span>
            </div>
            <div class="text-[#a9484e] font-medium">
              <span>{{ symbolData.high24Hour }}</span>
            </div>
          </div>
        </div>
        <!-- Detail 3 -->
        <div class="flex flex-col gap-1.5 text-center justify-center">
          <h5 class="font-medium text-[#2e3c42]">Volume</h5>
          <div class="flex flex-col">
            <div class="flex gap-1 justify-center text-[#26272b] font-medium">
              <span>24H:</span>
              <span>{{ symbolData.volume24Hour }}</span>
            </div>
            <div class="flex gap-1 justify-center text-[#26272b] font-medium">
              <span>Total 24H:</span>
              <span>{{ symbolData.totalVolume24Hour }}</span>
            </div>
          </div>
        </div>
        <!-- Detail 4 -->
        <div class="flex flex-col gap-1.5 text-center justify-center">
          <h5 class="font-medium text-[#2e3c42]">Market Cap</h5>
          <div class="flex flex-col">
            <div class="flex gap-1 justify-center text-[#26272b] font-medium">
              <span>{{ symbolData.marketcap }}</span>
            </div>
            <div class="flex gap-1 justify-center text-[#26272b] font-medium">
              <span>CapPenalty: </span>
              <span>{{ symbolData.marketcapPenalty }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-0 opacity-75 w-full scale-110 select-none">
      <CryptoChart v-if="monthMarketData.length > 0" :data="monthMarketData" />
    </div>
  </section>
</template>

<script setup>
import axios from "axios";
import { useToast } from "vue-toastification";
import { ref, onMounted, watch } from "vue";
import CryptoChart from "./../Charts/CryptoChart.vue";
import ArrowUpIcon from "../Icons/ArrowUpIcon.vue";

const props = defineProps(["name", "symbol"]);

const toast = useToast();

const monthMarketData = ref([]);
const symbolData = ref({});

const getMonthMarketChart = (coinId, days = 7) => {
  axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${coinId.toLowerCase()}/market_chart?vs_currency=usd&days=${days}`
    )
    .then((res) => {
      monthMarketData.value = [...res.data.prices.map((arr) => arr[1])];
    })
    .catch((err) => {
      toast.error("Something went wrong (Chart)");
      console.log(err);
    });
};

const getSymbolFullData = (symbol) => {
  axios
    .get(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol.toUpperCase()}&tsyms=USD`
    )
    .then((res) => {
      symbolData.value = {
        price: res.data.DISPLAY[symbol.toUpperCase()].USD.PRICE,
        change24HourPct:
          res.data.DISPLAY[symbol.toUpperCase()].USD.CHANGEPCT24HOUR,
        change24Hour: res.data.DISPLAY[symbol.toUpperCase()].USD.CHANGE24HOUR,
        low24Hour: res.data.DISPLAY[symbol.toUpperCase()].USD.LOW24HOUR,
        high24Hour: res.data.DISPLAY[symbol.toUpperCase()].USD.HIGH24HOUR,
        volume24Hour: res.data.DISPLAY[symbol.toUpperCase()].USD.VOLUME24HOUR,
        totalVolume24Hour:
          res.data.DISPLAY[symbol.toUpperCase()].USD.TOTALVOLUME24H,
        marketcap: res.data.DISPLAY[symbol.toUpperCase()].USD.MKTCAP,
        marketcapPenalty:
          res.data.DISPLAY[symbol.toUpperCase()].USD.MKTCAPPENALTY,
      };
    })
    .catch((err) => {
      toast.error("Something went wrong (Full Data)");
      console.log(err);
    });
};

watch(props, (currentValue) => {
  console.log(currentValue);
  getMonthMarketChart(props.name);
  getSymbolFullData(props.symbol);
});

onMounted(() => {
  getMonthMarketChart(props.name);
  getSymbolFullData(props.symbol);
});
</script>
