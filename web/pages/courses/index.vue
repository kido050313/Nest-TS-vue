<template>
  <div class="pa-3">
    <h3>视频列表</h3>
    <v-row>
      <v-col v-for="item in courses" :key="item._id" md="4" >
        <v-card
          :to="`/courses/${item._id}`"
          class="mx-auto"
          max-width="344"
        >
          <v-img
            :src="item.cover"
            height="200px"
          ></v-img>

          <v-card-title>{{item.name}}</v-card-title>

          <v-card-subtitle>{{item.createdAt}}</v-card-subtitle>

          <v-card-actions>
            <v-btn text>Share</v-btn>

            <v-btn
              color="purple"
              text
            >
              Explore
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {

  // asyncData优势：源代码可以看到关键字，利于SEO
  async asyncData({ $axios }) {
    const data = await $axios.$get('courses')
    return {
      courses: data.data
    }
  },
}
</script>

<style lang="stylus">

</style>