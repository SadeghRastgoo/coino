<template>
  <div id="chart" class="-mb-5">
    <apexchart
      type="area"
      height="200%"
      width="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { reactive, watch } from "vue";

const props = defineProps(["data"]);

const series = reactive([
  {
    name: "series-1",
    data: [],
  },
]);

const passDataSeries = () => {
  series[0].data = [...props.data];
};
passDataSeries();

const chartOptions = {
  chart: {
    id: "crypto-chart",
    toolbar: {
      show: false,
    },
    selection: {
      enabled: false,
    },
    zoom: {
      enabled: false,
    },
    sparkline: {
      enabled: false,
    },
  },
  theme: {
    mode: "light",
    monochrome: {
      enabled: true,
      color: "#27282d",
      shadeTo: "dark",
    },
  },
  tooltip: {
    enabled: false,
  },
  stroke: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  xaxis: {
    labels: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
};

watch(props, () => {
  passDataSeries();
});
</script>
