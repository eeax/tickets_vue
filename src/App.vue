<template>
  <div class="container mx-auto p-6">
    <TicketForm @submit="addTicket"/>
    <TicketList :tickets="tickets" @delete="deleteTicket" />
  </div>
</template>

<script>
import axios from 'axios'
import TicketForm from './components/TicketForm.vue'
import TicketList from './components/TicketList.vue'
import { API_URL } from "./constants.js";

export default {
  components: {
    TicketForm,
    TicketList
  },
  data () {
    return {
      tickets: [],
      apiURL: API_URL,
    }
  },
  methods: {
    addTicket(ticket) {
      if (!ticket || typeof ticket !== 'object' || !(ticket.text || ticket.email || ticket.file)) {
        return;
      }

      const formData = new FormData();

      formData.append("text", ticket.text || '');
      formData.append("email", ticket.email || '');

      if(ticket.file) {
        formData.append("file", ticket.file);
      }

      Promise.resolve(axios.post(this.apiURL, formData))
          .then(response => {
            this.tickets.push(response.data);
          })
          .catch(error => {
            console.log(error)
          });
    },

    deleteTicket(ticketId) {
      axios.delete(`${this.apiURL}/${ticketId}`)
          .then(() => {
            this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
          })
          .catch(error => {
            console.error(error);
          });
    }
  },
  created() {
    axios.get(this.apiURL)
        .then(response => {
          this.tickets = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
  }
}
</script>
