<script setup lang="ts">
import ChatWindow from "./chat/ChatWindow.vue";
import { ref, onMounted } from "vue";
import { Game, Input } from "@/game";

const canvas = ref<HTMLCanvasElement | null>(null);
onMounted(() => {
  canvas.value?.focus();
  const game = new Game({ canvas: canvas?.value });
  game.start();
});
</script>

<template>
  <canvas
    ref="canvas"
    id="game"
    tabindex="1"
    @focusout="Input.disable()"
    @focusin="Input.enable()"
  />
  <ChatWindow></ChatWindow>
</template>
