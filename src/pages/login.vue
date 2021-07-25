<template>
  <q-page class="row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-blue q-my-md">Login to See and create posts</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                type="number"
                square
                filled
                clearable
                v-model="userId"
                label="User Id"
                :rules="[
                  (val) => (val > 0 && val < 10) || 'Please enter user id',
                ]"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="blue"
              size="lg"
              class="full-width"
              label="Login"
              :to="{ name: 'home' }"
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
      userId: "",
    };
  },
  watch: {
    userId() {
      localStorage.setItem("userId", this.userId);
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
