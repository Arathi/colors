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

const filtered = computed(() => {
  const results: SearchResult[] = [];
  for (const color of colors.value) {
    results.push({
      color: color,
      // similarityRate: (currentColor.value != null) ? color.similarityRate(currentColor.value) : 0,
      delta: (currentColor.value != null) ? color.delta(currentColor.value) : undefined,
    } as SearchResult);
  }
  results.sort((a, b) => {
    if (a.delta != undefined && b.delta != undefined) {
      return a.delta - b.delta;
    }
    return 0;
  });
  return results;
});
</script>

<template>
  <div class="app">
    <div class="row row-filter">
      <input type="text" v-model="currentColorHex" />
    </div>
    <div class="row row-results">
      <color-block v-for="result in filtered" :value="result" :key="result.color.hex"/>
    </div>
  </div>
</template>

<style lang="less">
body {
  margin: 0;
}
</style>

<style scoped lang="less">
.app {
  width: 100%;
  display: flex;
  flex-direction: column;

  background-color: v-bind(currentColorHex);

  .row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
  }

  .row-filter {
    input {
      width: 100px;
    }

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
    justify-content: center;
  }
}
</style>
