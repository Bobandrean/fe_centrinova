<template>
  <BaseDialog ref="refModalAdd">
    <section class="login pa-5 mt-5">
      <h1 class="text-center">Add Post</h1>
      <v-form v-model="valid" @submit.prevent="handleSubmit">
        <v-text-field
          v-model="formValues.judul"
          label="Judul"
          required
        ></v-text-field>
        <v-text-field
          v-model="formValues.short_content"
          label="Short Content"
          required
        ></v-text-field>
        <v-textarea
          required
          v-model="formValues.entry"
          label="Entry"
        ></v-textarea>
        <v-file-input
          v-model="formValues.image"
          @change="handleChangePhoto($event)"
          label="Foto"
        ></v-file-input>
        <div class="d-flex justify-center">
          <v-btn type="submit" color="primary" block>Add</v-btn>
        </div>
      </v-form>
    </section>
  </BaseDialog>
</template>
  <script setup>
import BaseDialog from "@/components/Base/Dialog.vue";
import { reactive, ref } from "@vue/reactivity";
import { useBlogStore } from "@/stores/blog";

const blogStore = useBlogStore();

const formValues = reactive({
  judul: "",
  short_content: "",
  entry: "",
  image: "",
});

const refModalAdd = ref("");

const handleSubmit = () => {
  blogStore.createBlog(formValues).then(() => {
    blogStore.fetchBlog();
    refModalAdd.value.close();
  });
};
</script>