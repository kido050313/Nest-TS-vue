<template>
  <div>
    <avue-crud
      v-if="options.column"
      :page="page"
      :data="data.data"
      :option="options"
      @row-save='create'
      @row-update='update'
      @row-del='remove'
      @on-load="changePage"
      @sort-change="changeSort"
    >
    </avue-crud>

  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource: String

  data: any = { }

  options: any = { }

  page: any = {
    // pageSize: 2,
    // pageSizes: [2, 5, 10],
    total: 0
  }
  query: any = {
    // limit: 2
  }

  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    })
    this.data = res.data;
    this.page.total = res.data.total;
  }
  
  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`)
    this.options = res.data;
  }

  async changePage({ pageSize, currentPage}) {
    this.query.limit = pageSize;
    this.query.page = currentPage;
    this.fetch()
  }

  async changeSort({ order, prop}) {
      if (!order) {
        this.query.sort = null
      } else {
        this.query.sort = {
          [prop]: order === 'ascending' ? 1 : -1
        }
      }
      this.fetch()
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