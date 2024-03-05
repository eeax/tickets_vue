<template>
  <form class="flex flex-col gap-2" @submit.prevent.stop="handleSubmit">
    <textarea class="p-3 rounded-lg resize-none flex-1" v-model="message" placeholder="Ваше сообщение..." required rows="4"></textarea>
    <input type="email" class="p-3 rounded-lg min-h-10 flex-1" v-model="email" placeholder="Ваш email (не обязательно)" @input="validateEmail">
    <div v-if="emailError" class="text-red-500 text-[12px] leading-4">{{ emailError }}</div>
    <input type="file" class="p-3 rounded-lg min-h-32 bg-green-100 text-center border-dashed border-2 border-green-500 flex-1" @change="handleFileUpload" accept=".jpg,.jpeg,.png,.webp,.pdf" ref="fileInput" @dragover.prevent @drop.prevent="onDrop">
    <button class="btn bg-green-500 rounded-lg h-11 font-bold text-white" type="submit" :disabled="isLoading">
      <span v-if="isLoading">Загрузка...</span>
      <span v-else>Отправить</span>
    </button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      message: "",
      email: "",
      file: null,
      isLoading: false,
      emailError: ""
    }
  },
  methods: {
    validateEmail() {
      this.emailError = "";
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (this.email && !regex.test(this.email)) {
        this.emailError = "Не допустимое значение e-mail";
      }
    },
    handleSubmit() {
      this.isLoading = true

      if (this.emailError) {
        this.isLoading = false;
        return;
      }

      const ticket = {
        text: this.message,
        email: this.email,
        file: this.file
      };

      this.$emit('submit', ticket)

      this.message = "";
      this.email = "";
      this.file = null;
      this.$refs.fileInput.value = '';

      this.isLoading = false;
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    onDrop(event) {
      const fileList = Array.from(event.dataTransfer.files);
      const file = fileList[0];
      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.split('.').pop();

      const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp','pdf'];
      if (allowedExtensions.includes(fileExtension)) {
        this.file = file;
        this.$refs.fileInput.files = event.dataTransfer.files;
      } else {
        alert('Недопустимый формат файла. Пожалуйста выберите .jpg, .jpeg, .png, или .pdf файл');
      }
    }
  }
}
</script>
