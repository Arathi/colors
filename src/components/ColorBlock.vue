<script setup lang="ts">
import { computed } from 'vue';
import SearchResult from '../domains/SearchResult';

const props = defineProps<{
  value: SearchResult;
}>();

const color = computed(() => props.value.color);

const fontColor = computed(() => {
  const simRateBlack = color.value.similarityRateValue(0, 0, 0);
  if (simRateBlack >= 0.5) {
    return "#ffffff";
  }
  return "#000000";
});

const bgColor = computed(() => {
  return color.value.hex;
})

const similarityRate = computed(() => {
  if (props.value.similarityRate == 0) return undefined;
  const percent = (props.value.similarityRate * 100).toFixed(2);
  return `${percent}%`;
});
</script>

<template>
  <div class="search-result">
    <div class="name">{{ color.name }}</div>
    <div class="hex">{{ color.hex }}</div>
    <div class="similarity-rate" v-if="similarityRate != undefined">{{ similarityRate }}</div>
  </div>
</template>

<style scoped lang="less">
.search-result {
  width: 160px;
  height: 80px;
  
  display: flex;
  flex-direction: column;

  background-color: v-bind(bgColor);
  color: v-bind(fontColor);

  justify-content: center;
  align-items: center;
}
</style>