<template>
  <BaseDialog ref="refModalEdit">
    <section class="login pa-5 mt-5">
      <h1 class="text-center">Edit Post</h1>
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
        <v-img style="height: 250px" :src="oldImage"></v-img>
        <v-file-input
          v-model="formValues.image"
          @change="handleChangePhoto($event)"
          label="Foto"
        ></v-file-input>
        <div class="d-flex justify-center">
          <v-btn type="submit" color="primary" block>Edit</v-btn>
        </div>
      </v-form>
    </section>
  </BaseDialog>
</template>
  <script setup>
import BaseDialog from "@/components/Base/Dialog.vue";
import { reactive, ref, computed, watch } from "vue";
import { useBlogStore } from "@/stores/blog";

const blogStore = useBlogStore();

const formValues = reactive({
  judul: "",
  short_content: "",
  entry: "",
  image: "",
});

const getDetailBlog = computed(() => blogStore.getDetailBlog);

const oldImage = ref("");
const id = ref("");

watch(getDetailBlog, (val) => {
  id.value = val.id;
  formValues.judul = val.judul;
  formValues.short_content = val.short_content;
  formValues.entry = val.detail.entry;
  oldImage.value = val.path;
});

const refModalEdit = ref("");

const handleSubmit = () => {
  blogStore.updateBlog(id.value, formValues).then(() => {
    blogStore.fetchBlog();
    refModalEdit.value.close();
  });
};
</script>