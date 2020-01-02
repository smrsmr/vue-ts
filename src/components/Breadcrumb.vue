<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
    <!-- <el-breadcrumb-item v-for="item in levelList"
                        :key="item.path">
      <router-link :to="item.path"
                   class="set-hover-color">
        {{item.meta.title}}
      </router-link>
    </el-breadcrumb-item> -->
    <el-breadcrumb-item v-for="item in levelList" :key="item.path" class="el-breadcrumb__inner">
      <router-link v-if="item.meta.parentPath" :to="`${item.meta.parentPath}?id=${$router.query.id}`">
        {{ item.meta.parentTitle }}
        <i class="el-icon-arrow-right" style="margin: 0 6px;color: #C0C4CC;"></i>
      </router-link>
      <span else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";
@Component
export default class Breadcrumb extends Vue {
  //data
  private levelList: Array<{}> = []; //路由列表
  //监听路由
  @Watch("$route")
  routeChange(to: any, from: any) {
    this.getBreadcrumb();
  }
  //mounted
  mounted() {
    //更新面包屑
    this.getBreadcrumb();
  }
  //生成面包屑
  getBreadcrumb() {
    // //console.log(this.$router.options.routes);
    // let matched = this.$route.matched.filter(item => {
    //   return item.name !== "home";
    // });
    this.levelList = this.$route.matched.splice(1, 1);
  }
}
</script>
<style lang="less" scoped>
.router-link-active:hover {
  cursor: pointer !important;
  color: #409eff !important;
}
</style>
