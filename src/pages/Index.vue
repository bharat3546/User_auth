<template>
  <q-page>
    <div>
      <q-splitter v-model="splitterModel" style="height: 1000px">
        <template v-slot:before>
          <q-tabs v-model="tab" vertical class="text-teal">
            <q-tab name="createPost" icon="mail" label="Create Post" />
            <q-tab name="seePost" icon="alarm" label="See Post" />
            <q-tab name="createComment" icon="alarm" label="createComment" />
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
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
            </q-tab-panel>

            <q-tab-panel name="createComment">
              <div class="text-h4 q-mb-md">Create Comment</div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis
                praesentium cumque magnam odio iure quidem, quod illum numquam
                possimus obcaecati commodi minima assumenda consectetur culpa
                fuga nulla ullam. In, libero.
              </p>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tab: "createPost",
      splitterModel: 20,
      title: "",
      body: "",
      authenticatedUser: "",
    };
  },
  created() {
    this.authenticatedUser = "bharat.kaushik@gmail.com";
    this.getPost();
  },
  methods: {
    async createPost() {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
          title: this.title,
          body: this.body,
          userId: 202,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
        });

      fetch(`https://jsonplaceholder.typicode.com/posts?userId=202`)
        .then((response) => response.json())
        .then((json) => console.log("hello get data", json));

      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((json) => console.log(json));
    },
    getPost() {
      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${this.authenticatedUser}`
      )
        .then((response) => response.json())
        .then((json) => console.log(json));
    },
  },
};
</script>
