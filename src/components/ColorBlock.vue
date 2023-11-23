<script setup lang="ts">
import { computed } from 'vue';
import SearchResult from '../domains/SearchResult';

const props = defineProps<{
  value: SearchResult;
}>();

const color = computed(() => props.value.color);

const fontColor = computed(() => {
  if (color.value.r < 128 && color.value.g < 128 && color.value.b < 128) {
    return "#ffffff";
  }
  return "#000000";
});

const bgColor = computed(() => {
  return color.value.hex;
})

const delta = computed(() => {
  if (props.value.delta == undefined) {
    return undefined;
  }
  return props.value.delta.toFixed(2);
});
</script>

<template>
  <div class="search-result">
    <div class="name">{{ color.name }}</div>
    <div class="hex">{{ color.hex }}</div>
    <div class="delta" v-if="delta != undefined">{{ delta }}</div>
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

  margin: 8px;
  // border: 1px solid;
  box-shadow: 1px 1px 10px black;
  border-radius: 10px;
}
</style>