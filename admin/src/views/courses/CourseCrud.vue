<template>
  <div>
    <avue-crud
      v-if="options.column"
      :data="data.data"
      :option="options"
      @row-save='create'
      @row-update='update'
      @row-del='remove'
    >
    </avue-crud>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class CourseList extends Vue {
  data = { }

  options = { }

  async fetch() {
    const res = await this.$http.get('courses')
    this.data = res.data;
  }
  
  async fetchOption() {
    const res = await this.$http.get('courses/option')
    this.options = res.data;
  }

  async create(row,done,loading) {
    await this.$http.post('courses', row) 
    this.$message.success('创建成功')
    this.fetch()
    done()
  }

  async update(row,index,done,loading) {
    const data = JSON.parse(JSON.stringify(row))
    delete data.$index;
    await this.$http.put(`courses/${data._id}`, data)
    this.$message.success('更新成功')
    this.fetch()
    done()
  }

  async remove(row,index) {
    try {
      await this.$confirm('请确认是否删除?')
    } catch (error) {
      return;
    }
    await this.$http.delete(`courses/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }

  created() {
    this.fetch()
    this.fetchOption()
  }
}
</script>

<style>

</style>