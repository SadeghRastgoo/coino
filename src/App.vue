<template>
  <div
    class="min-h-screen grid grid-rows-[1fr_auto] grid-cols-1 overflow-hidden"
  >
    <Crypto :name="currentCryptoName[1]" :symbol="currentCryptoName[0]" />
    <Cryptocurrencies
      @clickedCrypto="handleCryptoCardClick"
      heading="Top Cryptocurrencies"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Cryptocurrencies from "./components/Cryptocurrencies/Cryptocurrencies.vue";
import Crypto from "./components/Crypto/Crypto.vue";

const currentCryptoName = ref(["BTC", "Bitcoin"]);

const handleCryptoCardClick = (cryptoName) => {
  currentCryptoName.value = cryptoName;
};
</script>

<style>
.price-text-gradient {
  background: linear-gradient(to right, #4f5054, #1e1f23);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-container-gradient {
  background: linear-gradient(to right, #cbebec, #bfe4e8, #bbe4e7);
}
.footer-container-gradient {
  background: linear-gradient(to right, #484c53, #2a2b32, #1e1f23);
}
</style>
