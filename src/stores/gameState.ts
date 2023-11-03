import { defineStore } from "pinia";

export const useGameState = defineStore({
  id: "gameState",
  state: () => ({
    focus: true,
  }),
});
