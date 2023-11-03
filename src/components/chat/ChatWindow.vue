<script setup lang="ts">
import { useChatLog } from "@/stores/chatlog";
import { ref } from "vue";

const chat = useChatLog();

const user = "me";
const message = ref("");

let id = 0;
function onMessageSend(event: Event) {
  const text = message.value.trim();
  console.log(message.value);
  if (text.length > 0) id++;

  event.preventDefault();
  chat.push({
    id,
    user,
    text,
  });

  message.value = "";
}
</script>

<template>
  <div id="chat">
    <input
      class="chat-input"
      v-model="message"
      @submit="onMessageSend"
      v-on:keyup.enter="onMessageSend"
    />
    <div class="chat-messages">
      <div v-for="msg in chat.messages.slice().reverse()" v-bind:key="msg.id">
        [{{ msg.user }}]: {{ msg.text }}
      </div>
    </div>
  </div>
</template>

<style>
#chat {
  height: 24rem;
  width: 36rem;
  display: flex;
  flex-direction: column-reverse;
  background-color: #00000080;
  color: white;
  padding: 2rem;
  position: fixed;
  bottom: 0;
  left: 0;
}

.chat-input {
  font-size: 1.4rem;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid white;
  color: white;

  pointer-events: initial;
}

.chat-input:focus {
  outline: none;
  stroke: none;
}

.chat-messages {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
}
</style>
