<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({

})
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
/* 上传图片大小 */
.avue-upload__avatar {
  height: auto!important;
}
</style>
