<template>
  <div>
    <q-inner-loading :showing="loading">
      <q-spinner size="50px" color="primary" />
    </q-inner-loading>
    <q-splitter v-model="splitterModel" style="height: 1000px">
      <template v-slot:before>
        <q-tabs v-model="tab" vertical class="text-teal">
          <q-tab name="createPost" icon="edit" label="Create Post" />
          <q-tab name="seePost" icon="visibility" label="See Post" />
        </q-tabs>
      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="tab"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel name="createPost">
            <div class="text-h4 q-mb-md">Create Post</div>
            <q-form class="q-gutter-md">
              <q-input
                filled
                v-model="title"
                label="Enter Post Title"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type title',
                ]"
              />

              <q-input
                filled
                v-model="body"
                label="Enter Post Body"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type post body',
                ]"
              />
              <div>
                <q-btn
                  label="Create Post"
                  color="primary"
                  class="q-ml-sm"
                  @click="createPost"
                />
              </div>
            </q-form>
          </q-tab-panel>

          <q-tab-panel name="seePost">
            <div class="text-h4 q-mb-md">See Post</div>
            <q-list
              bordered
              separator
              v-for="post in authenticatedUser.posts"
              :key="post.id"
            >
              <q-item clickable v-ripple @click="showUpdateCommment(post)">
                <q-card dark bordered class="bg-grey-9 my-card">
                  <q-card-section>
                    <div class="text-h6">{{ post.title }}</div>
                  </q-card-section>

                  <q-separator dark inset />

                  <q-card-section>
                    {{ post.body }}
                  </q-card-section>
                </q-card>
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="updateComment">
            <div class="text-h4 q-mb-md">Update Comment</div>
            <q-input
              disable
              filled
              v-model="selectedPostId"
              label="Enter Post Body"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Please type post body',
              ]"
            />
            <q-input
              filled
              v-model="selectedPostTitle"
              label="Enter Post Title"
              lazy-rules
              :rules="[(val) => (val && val.length > 0) || 'Please type title']"
            />
            <q-input
              filled
              v-model="selectedPostBody"
              label="Enter Post Body"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Please type post body',
              ]"
            />
            <q-btn
              label="update Post"
              color="primary"
              class="q-ml-sm"
              @click="updatePost"
            />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "createPost",
      splitterModel: 20,
      title: "",
      body: "",
      authenticatedUser: {
        id: null,
        posts: [],
      },
      selectedPostId: "",
      selectedPostTitle: "",
      selectedPostBody: "",
      loading: false,
    };
  },
  created() {
    this.authenticatedUser.id = localStorage.getItem("userId");
    this.getPost();
  },
  methods: {
    createPost() {
      this.loading = true;
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: this.title,
          body: this.body,
          userId: this.authenticatedUser.id,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.loading = false;
          this.$q.notify({
            message: "Your data has been saved",
            color: "green",
          });
        });
    },
    getPost() {
      this.loading = true;
      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.authenticatedUser.id}`
      )
        .then((response) => response.json())
        .then((json) => {
          this.loading = false;
          this.authenticatedUser.posts = json;
        });
    },
    showUpdateCommment(post) {
      this.tab = "updateComment";
      this.selectedPostId = post.id;
      this.selectedPostTitle = post.title;
      this.selectedPostBody = post.body;
    },
    updatePost() {
      this.loading = true;
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${this.selectedPostId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: this.selectedPostId,
            title: this.selectedPostTitle,
            body: this.selectedPostBody,
            userId: this.authenticatedUser.id,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((json) => {
          this.loading = false;
          this.tab = "seePost";
          this.$q.notify({
            message: "Your data has been updated",
            color: "green",
          });
        });
    },
  },
};
</script>
