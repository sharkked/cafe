import { defineStore } from "pinia";

interface Message {
  id: number;
  user: string;
  text: string;
}

interface ChatLog {
  messages: Message[];
}

export const useChatLog = defineStore({
  id: "chatlog",
  state: () =>
    ({
      messages: [],
    }) as ChatLog,
  actions: {
    push(message: Message) {
      this.messages.push(message);
    },
  },
});
