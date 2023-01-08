<template>
  <BaseDialog ref="refModalComment" max-width="1000">
    <section class="login pa-5 mt-5">
      <h1 class="text-center mb-5">Post Comment</h1>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Nama</th>
            <th class="text-left">Email</th>
            <th class="text-left">Comment</th>
            <th class="text-left">Waktu</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="comment in getComment" :key="comment.id">
            <td>{{ comment.nama }}</td>
            <td>{{ comment.email }}</td>
            <td>{{ comment.comment }}</td>
            <td>{{ comment.created_at }}</td>
            <td class="d-flex align-center gap-3">
              <v-icon
                class="mx-3"
                color="error"
                style="cursor: pointer"
                @click="handleDelete(comment.id)"
                >mdi-delete</v-icon
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </section>
  </BaseDialog>
</template>
  <script setup>
import BaseDialog from "@/components/Base/Dialog.vue";
import { reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useCommentStore } from "../../stores/comment";

const commentStore = useCommentStore();

const formValues = reactive({
  email: "",
  password: "",
});

const props = defineProps({
  idBlog: Number,
});

const getComment = computed(() => commentStore.getComment);

const handleSubmit = () => {
  console.log(formValues);
};

const handleDelete = (id) => {
  commentStore.deleteComment(id, props.idBlog).then(() => {
    commentStore.fetchComment(props.idBlog);
  });
};
</script>