<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Game } from "@/ts/game";

const canvas = ref<HTMLCanvasElement | null>(null);
onMounted(() => {
  const game = new Game(canvas?.value);
  game.start();
});
</script>

<template>
  <main>
    <canvas ref="canvas" id="#game" />
  </main>
</template>

<style scoped>
#game {
  width: 100%;
  height: 100%;
}
</style>
