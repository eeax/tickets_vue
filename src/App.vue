<template>
  <div class="container mx-auto p-6">
    <form class="flex flex-col gap-2" @submit.prevent="addMessage">
      <textarea class="p-3 rounded-lg resize-none flex-1" rows="6" v-model="message" placeholder="Ваше сообщение..." required></textarea>
      <input type="email" v-model="email" placeholder="Ваша почта (не обязательно)" class="p-3 rounded-lg min-h-10 flex-1">
      <button class="btn bg-green-400 rounded-lg h-11" type="submit">отправить</button>
    </form>
    <ul class="space-y-2 mt-10">
      <Ticket v-for="(message, index) in messages" :key="index" :text="message.text" />
    </ul>
  </div>
</template>

<script>
import Ticket from './components/Ticket.vue'

export default {
  components: {
    Ticket
  },
  data () {
    return {
      message: "",
      email: "",
      messages: [],
    }
  },
  methods: {
    addMessage() {
      this.messages.push({ text: this.message, email: this.email });
      this.message = "";
      this.email = "";
    }
  }
}
</script>
