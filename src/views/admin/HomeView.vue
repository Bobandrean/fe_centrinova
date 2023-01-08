<template>
  <!-- Modal Post Edit -->
  <ModalPostEdit ref="refModalPostEdit"></ModalPostEdit>
  <!-- End Modal Post Edit -->

  <!-- Modal Post Add -->
  <ModalPostAdd ref="refModalPostAdd"></ModalPostAdd>
  <!-- End Modal Post Add -->

  <!-- Modal Post Comment -->
  <ModalPostComment
    :idBlog="idBlog"
    ref="refModalPostComment"
  ></ModalPostComment>
  <!-- End Modal Post Comment -->

  <v-card>
    <v-tabs v-model="tab" bg-color="primary" fixed-tabs>
      <v-tab value="one">Profile</v-tab>
      <v-tab value="two">Post</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="one">
          <div class="d-flex justify-center">
            <v-img
              style="height: 140px"
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            ></v-img>
          </div>
          <div class="my-5">
            <v-row>
              <v-col md="12" class="text-center">
                <h1>
                  {{ isUser.name }}
                </h1>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="12" class="text-center">
                <h2>
                  {{ isUser.email }}
                </h2>
              </v-col>
            </v-row>
          </div>
        </v-window-item>
        <v-window-item value="two">
          <v-btn @click="handleAddPost" block class="my-5" color="success"
            >Add Post</v-btn
          >
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Nama</th>
                <th class="text-left">Short Content</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in getBlog.data" :key="item.name">
                <td>{{ item.judul }}</td>
                <td>{{ item.short_content }}</td>
                <td class="d-flex align-center gap-3">
                  <v-icon
                    color="success"
                    style="cursor: pointer"
                    @click="handlePostComment(item.id)"
                    >mdi-comment</v-icon
                  >
                  <v-icon
                    class="mx-3"
                    color="error"
                    style="cursor: pointer"
                    @click="handlePostDelete(item.id)"
                    >mdi-delete</v-icon
                  >
                  <v-icon
                    color="warning"
                    style="cursor: pointer"
                    @click="handlePostEdit(item.id)"
                    >mdi-pencil</v-icon
                  >
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ModalPostEdit from "@/components/Modal/PostEdit.vue";
import ModalPostAdd from "@/components/Modal/PostAdd.vue";
import ModalPostComment from "@/components/Modal/PostComment.vue";
import { useBlogStore } from "@/stores/blog";
import { useCommentStore } from "@/stores/comment";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";

const blogStore = useBlogStore();
const commentStore = useCommentStore();
const authStore = useAuthStore();
const route = useRoute();

const desserts = [
  {
    name: "Frozen Yogurt",
    calories: 159,
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
  },
  {
    name: "Eclair",
    calories: 262,
  },
  {
    name: "Cupcake",
    calories: 305,
  },
  {
    name: "Gingerbread",
    calories: 356,
  },
  {
    name: "Jelly bean",
    calories: 375,
  },
  {
    name: "Lollipop",
    calories: 392,
  },
  {
    name: "Honeycomb",
    calories: 408,
  },
  {
    name: "Donut",
    calories: 452,
  },
  {
    name: "KitKat",
    calories: 518,
  },
];

const tab = ref("");

const handlePostDelete = (id) => {
  blogStore.deleteBlog(id).then(() => {
    blogStore.fetchBlog();
  });
};

const getBlog = computed(() => blogStore.getBlog);
const isUser = computed(() => authStore.getIsUser);

const refModalPostEdit = ref("");
const handlePostEdit = (id) => {
  refModalPostEdit.value.$refs.refModalEdit.open();
  blogStore.fetchDetailBlog(id);
};

const refModalPostAdd = ref("");
const handleAddPost = () => {
  refModalPostAdd.value.$refs.refModalAdd.open();
};

const refModalPostComment = ref("");
const idBlog = ref("");
const handlePostComment = (id) => {
  refModalPostComment.value.$refs.refModalComment.open();
  commentStore.fetchComment(id);
  idBlog.value = id;
};

onMounted(() => {
  blogStore.fetchBlog();
});
</script>