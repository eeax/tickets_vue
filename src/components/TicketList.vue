<template>
  <ul class="space-y-2 mt-14">
    <Ticket
        v-for="ticket in tickets"
        :key="ticket.id"
        :id="ticket.id"
        :text="ticket.text"
        :email="ticket.email"
        :file="ticket.file"
        @deleteTicket="handleDeleteTicket"
    />
  </ul>
</template>

<script>
import Ticket from '../components/Ticket.vue'

export default {
  components: {
    Ticket
  },
  props: ["tickets"],
  methods: {
    handleDeleteTicket(ticketId) {
      this.$emit('delete', ticketId)
    }
  },
}
</script>
