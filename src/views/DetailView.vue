

<template>
  <div class="detail">
    <v-img
      class="align-end text-white"
      height="500"
      :src="getDetailBlog.path"
      cover
    >
    </v-img>
    <br />
    <h1>{{ getDetailBlog.judul }}</h1>
    <div>
      <p>
        {{ getDetailBlog.short_content }}
      </p>
    </div>
    <h3 class="mt-3">Comment</h3>
    <div
      v-for="comment in getDetailBlog.comment"
      class="d-flex justify-space-between pa-5"
      :key="comment.id"
    >
      <div class="d-flex align-items-center">
        <v-avatar>
          <v-img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          ></v-img>
        </v-avatar>
        <p class="ml-2 my-auto">{{ comment.nama }}</p>
      </div>
      <div class="my-auto text-right">
        <div>{{ comment.comment }}</div>
        <div>{{ comment.created_at }}</div>
      </div>
    </div>
    <h3 class="mt-3">Form Comment</h3>
    <div class="my-3">
      <v-form @submit.prevent="handleSubmit">
        <v-row>
          <v-col md="6">
            <v-text-field
              v-model="formValues.nama"
              label="Name"
              required
            ></v-text-field
          ></v-col>
          <v-col md="6"
            ><v-text-field
              v-model="formValues.email"
              type="email"
              label="Email"
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-textarea
          required
          v-model="formValues.comment"
          label="Comment"
        ></v-textarea>
        <v-btn type="submit" block>Submit</v-btn>
      </v-form>
    </div>
  </div>
</template>
  <script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useBlogStore } from "@/stores/blog";
import { useCommentStore } from "@/stores/comment";
import { useRoute } from "vue-router";

const blogStore = useBlogStore();
const commentStore = useCommentStore();
const route = useRoute();

const getDetailBlog = computed(() => blogStore.getDetailBlog);

const formValues = reactive({
  nama: "",
  email: "",
  comment: "",
});

const handleSubmit = () => {
  commentStore.createComment(route.params.id, formValues).then(() => {
    blogStore.fetchDetailBlog(route.params.id);
  });
};

onMounted(() => {
  blogStore.fetchDetailBlog(route.params.id);
});
</script>