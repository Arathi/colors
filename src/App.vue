<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import ColorBlock from './components/ColorBlock.vue';

import Color from './domains/Color';
import ZhongGuoSe from './domains/ZhongGuoSe';
import zgsList from './assets/colors.json';
import SearchResult from './domains/SearchResult';

const currentColorHex = ref<string>("");

const colors = ref<Color[]>([]);

onMounted(() => {
  for (const opts of zgsList) {
    const zgs = new ZhongGuoSe(opts);
    colors.value.push(zgs.toColor());
  }
  console.info(`加载颜色${colors.value.length}种`);
});

const currentColor = computed(() => Color.fromHex(currentColorHex.value));

function getSimilarityRate(color: Color): number | undefined {
  if (currentColor.value == null) return undefined;
  return color.similarityRate(currentColor.value);
}

const filtered = computed(() => {
  const results: SearchResult[] = [];
  for (const color of colors.value) {
    results.push({
      color: color,
      similarityRate: (currentColor.value != null) ? color.similarityRate(currentColor.value) : 0,
    } as SearchResult);
  }
  results.sort((a, b) => {
    return b.similarityRate - a.similarityRate;
  });
  return results;
});
</script>

<template>
  <div class="app">
    <div class="row row-filter">
      <input type="text" v-model="currentColorHex" />
      <div class="color-block"></div>
    </div>
    <div class="row row-results">
      <color-block v-for="result in filtered" :value="result" :key="result.color.hex"/>
    </div>
  </div>
</template>

<style scoped lang="less">
.app {
  display: flex;
  flex-direction: column;

  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .row-filter {
    margin-bottom: 10px;
    
    .color-block {
      width: 16px;
      height: 16px;
      background-color: v-bind(currentColorHex);

      margin-left: 16px;
    }
  }

  .row-results {
    width: 100%;
    flex-wrap: wrap;
    justify-content: start;
  }
}
</style>
