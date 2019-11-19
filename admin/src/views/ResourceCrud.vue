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
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource: String

  data = { }

  options = { }

  async fetch() {
    const res = await this.$http.get(`${this.resource}`)
    this.data = res.data;
  }
  
  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`)
    this.options = res.data;
  }

  async create(row,done,loading) {
    await this.$http.post(`${this.resource}`, row) 
    this.$message.success('创建成功')
    this.fetch()
    done()
  }

  async update(row,index,done,loading) {
    const data = JSON.parse(JSON.stringify(row))
    delete data.$index;
    await this.$http.put(`${this.resource}/${data._id}`, data)
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
    await this.$http.delete(`${this.resource}/${row._id}`)
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