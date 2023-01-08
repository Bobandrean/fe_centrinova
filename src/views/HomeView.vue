<template>
  <v-row>
    <v-col v-for="blog in getBlog?.data" :key="blog.id" cols="4">
      <v-card @click="handleDetail(blog.id)" class="mx-auto" max-width="400">
        <v-img class="align-end text-white" height="200" :src="blog.path" cover>
          <v-card-title>{{ blog.judul }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pt-4">
          Total Comment : {{ blog.jumlah_comment }}
        </v-card-subtitle>

        <v-card-text>
          <div>{{ blog.short_content }}</div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useBlogStore } from "@/stores/blog";

const blogStore = useBlogStore();
const router = useRouter();

const handleDetail = (id) => {
  console.log("kepencet");
  router.push(`/detail/${id}`);
};

const getBlog = computed(() => blogStore.getBlog);

onMounted(() => {
  blogStore.fetchBlog();
});
</script>