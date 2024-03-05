<template>
  <div class="container flex justify-between mx-auto p-4 bg-gray-50 rounded-lg gap-4">
    <div class="space-y-3 w-full">
      <p>{{ text }}</p>
      <div class="border-dashed border-t border-gray-300 flex gap-x-4 text-[12px] leading-4 p-1.5" v-if="email || file">
        <div v-if="email" class="item-start">
          e-mail: <a :href="'mailto:' + email" class="text-blue-600">{{ email }}</a>
        </div>
        <div v-if="file" class="item-end">
          файл: <a :href="fileUrl" target="_blank" class="text-blue-600">открыть</a>
        </div>
      </div>
    </div>
    <div class="flex items-start">
      <button class="px-3 py-1 text-center bg-red-600 font-bold text-[12px] leading-4 text-white rounded-lg" @click="deleteTicket">
        удалить
      </button>
    </div>
  </div>
</template>

<script>
import { UPLOAD_URL } from "../constants.js";
export default {
  props: ['id', 'text', 'email','file'],
  computed: {
    fileUrl() {
      return this.file ? `${UPLOAD_URL}/${this.file}` : null;
    },
  },
  methods: {
    deleteTicket() {
      this.$emit('deleteTicket', this.id);
    }
  }
}
</script>
