<template>
  <!-- Modal Login -->
  <ModalLogin ref="refModalLogin"></ModalLogin>
  <!-- End Modal Login -->

  <v-app id="inspire">
    <v-app-bar app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title @click="$router.push('/')">Blog</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn v-if="isAuth == ''" @click="handleModalLogin"> Login </v-btn>
      <v-btn v-if="isAuth != ''" @click="$router.push('/admin')"> Admin </v-btn>
      <v-btn v-if="isAuth != ''" @click="handleLogout"> Logout </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useAuthStore } from "./stores/auth";

import ModalLogin from "@/components/modal/Login.vue";

const authStore = useAuthStore();

const refModalLogin = ref("");

const isAuth = computed(() => authStore.getIsAuth);

const handleModalLogin = () => {
  refModalLogin.value.$refs.refModalLogin.open();
};

const handleLogout = () => {
  authStore.logout();
};
</script>