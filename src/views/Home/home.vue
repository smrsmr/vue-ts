<template>
  <el-row class="container">
    <admin-header></admin-header>
    <el-col :span="24" class="main">
      <aside :class="collapsed ? 'menu-collapsed' : 'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.fullPath" :unique-opened="true" router v-show="!collapsed">
          <template v-for="(item, index) in menuTree">
            <template>
              <el-submenu v-if="item.children" :key="index" :index="index + ''">
                <template slot="title">{{ item.name }}</template>
                <div v-for="(child, index) in item.children" :index="child.path" :key="child.path">
                  <template v-if="child.children">
                    <el-submenu :index="index + ''">
                      <template slot="title">{{ child.name }}</template>
                      <el-menu-item v-for="grandson in child.children" :index="`${grandson.path}?id=${grandson.id}`" :key="grandson.path">{{ grandson.name }}</el-menu-item>
                    </el-submenu>
                  </template>
                  <el-menu-item :index="`${child.path}?id=${child.id}`" :key="child.path" v-if="!child.children">{{ child.name }}</el-menu-item>
                </div>
              </el-submenu>
              <el-menu-item v-if="!item.children" :key="index" :index="item.path">{{ item.name }}</el-menu-item>
            </template>
          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <el-col :span="24" class="breadcrumb-container">
          <!-- <el-breadcrumb separator="/"
                        class="breadcrumb-inner">
            <el-breadcrumb-item v-for="item in $route.matched"
                                :key="item.path">
            {{ item.meta.title }}
            </el-breadcrumb-item>
        </el-breadcrumb> -->
          <admin-breadcrumb></admin-breadcrumb>
        </el-col>
        <el-col :span="24" class="content-wrapper pad-t-30 pad-b-30">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-col>
      </section>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import AdminHeader from "../../components/AdminHeader.vue";
import Breadcrumb from "../../components/Breadcrumb.vue";

// declare function require(any): string;
const sysUserAvatar = require("../../assets/images/common/user.png");
@Component({
  components: {
    "admin-header": AdminHeader,
    "admin-breadcrumb": Breadcrumb
  }
})
export default class Home extends Vue {
  private collapsed: boolean = false;
  private loading: boolean = false; //菜单loading
  private menuTree: any = null; //过滤后的菜单树
  private userId: number = 1;
  //methods
  created() {
    this.getMenu();
  }
  //获取菜单
  getMenu() {
    let params: object = {
      userId: this.userId
    };
    this.loading = true;
    this.$api.authority
      .findMenuZtree(params)
      .then((res: any) => {
        if (res.data.code === this.$config.RET_CODE.SUCCESS_CODE) {
          this.menuTree = this.filterTree(res.data.data);
          this.loading = false;
        } else {
          this.$message.error(res.data.msg);
          this.loading = false;
        }
      })
      .catch((err: any) => {
        console.log(err);
        this.loading = false;
      });
  }

  // 1、登录获取data菜单
  // 2、第二步判断children的长度是否为0，如果为0就删除children这个属性，因为element菜单如果有children还会有下拉箭头
  // 3、判断返回数据的type是否为1，如果为1，过滤掉该对象，因为0是菜单  1是按钮 ， 按钮不需要显示在菜单列表
  // 4、赋值
  //过滤树菜单按钮
  filterTree(data: Array<object>) {
    data.forEach((v: any) => {
      v.children = v.children && v.children.filter((item: any) => item.type !== 1); //返回type不等于1 0是菜单 1是按钮

      if (v.children && v.children.length) {
        this.filterTree(v.children);
      } else {
        delete v.children;
      }
    });
    return data;
  }
}
</script>
<style scoped lang="less">
@import "../../assets/less/home.less";
</style>
