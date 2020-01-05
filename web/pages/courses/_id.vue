<template>
  <div class="pa-3">
    <h3>{{course.name}}</h3>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const { id } = params;
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' } // nestjs mongoseCRUD 告知查询关联数据
      }
    });
    return {
      id,
      course
    }
  },
}
</script>

<style>

</style>