<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title> User Dashboard </q-toolbar-title>
        <q-btn
          label="Logout"
          dense
          color="primary"
          class="q-ml-sm"
          @click="logOut"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "Home",
  methods: {
    logOut() {
      localStorage.removeItem("userId");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
