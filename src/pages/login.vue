<template>
  <q-page
    class="
      bg-light-green
      window-height window-width
      row
      justify-center
      items-center
    "
  >
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">
          Login to See and create posts
        </h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="email"
                type="email"
                label="email"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="light-green-7"
              size="lg"
              class="full-width"
              label="Login"
              @click="userLogin"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    userLogin() {
      let users = JSON.parse(localStorage.getItem("users"));
      if (!users) {
        users = [];
      }
      users.push(this.email);
      localStorage.setItem("users", JSON.stringify(users));
      this.$router.push({});
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
