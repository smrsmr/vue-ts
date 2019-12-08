<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed ? 'logo-collapse-width' : 'logo-width'">
        <img :src="logoSrc" alt />
        <div>{{ collapsed ? "" : sysName }}</div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <!-- <img :src="this.sysUserAvatar" /> -->
            {{ sysUserName }}
          </span>
          <el-dropdown-menu slot="dropdown" class="custom">
            <el-dropdown-item @click.native="toPersonalCenter">我的消息</el-dropdown-item>
            <!-- <el-dropdown-item>设置</el-dropdown-item> -->
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <aside :class="collapsed ? 'menu-collapsed' : 'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" unique-opened router v-show="!collapsed">
          <template v-for="(item, index) in $router.options.routes">
            <template v-if="!item.hidden">
              <el-submenu :key="index" :index="index + ''" v-if="!item.leaf">
                <template slot="title">
                  <i :class="item.iconCls"></i>
                  {{ item.name }}
                </template>
                <div v-for="(child, index) in item.children" :index="child.path" :key="child.path" v-show="!child.hidden">
                  <template v-if="child.children">
                    <el-submenu :index="index + ''">
                      <template slot="title">{{ child.name }}</template>
                      <el-menu-item v-for="grandson in child.children" :index="grandson.path" :key="grandson.path" v-show="!grandson.hidden" router="true" :route="grandson.path">{{
                        grandson.name
                      }}</el-menu-item>
                    </el-submenu>
                  </template>
                  <el-menu-item :index="child.path" :key="child.path" v-show="!child.children">{{ child.name }}</el-menu-item>
                </div>
              </el-submenu>
              <el-menu-item v-if="item.leaf && item.children.length > 0" :key="index" :index="item.children[0].path">
                <i :class="item.iconCls"></i>
                {{ item.children[0].name }}
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{ $route.name }}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">{{ item.name }}</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {
  // data
  private sysName: string = "我是个人搭建的vue-cli+ts项目";
  private collapsed: boolean = false;
  private sysUserName: string = "点我";
  private logoSrc: string = require("../../assets/logo.png");
  mounted() {
    // console.log(this.$router);
    // this.$axios
    //   .post("/login")
    //   .then((result: any) => {
    //     console.log(result);
    //   })
    //   .catch((err: any) => {
    //     console.log(err);
    //   });
  }
  // methods
  private toPersonalCenter() {}
  private handleopen() {}
  private handleclose() {}
  private handleselect() {}
}
</script>

<style scoped lang="less">
.el-menu-item,
.el-submenu__title {
  height: auto !important;
}

.container {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #263445;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 12px 0px 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      //width:230px;
      height: 60px;
      font-size: 22px;
      padding-left: 20px;
      padding-right: 20px;
      div {
        float: left;
      }
      img {
        float: left;
        width: 92px;
        height: 40px;
        object-fit: contain;
        padding-top: 10px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-collapse-width {
      width: 60px;
    }
    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
  .main {
    display: flex;
    position: absolute;
    top: 60px;
    bottom: 0px;
    overflow: hidden;
    background-color: white;
    aside {
      flex: 0 0 230px;
      width: 230px;
      .el-menu {
        height: 100%;
        overflow: auto;
        background-color: #cccccc;
      }
      .collapsed {
        width: 60px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 60px;
          z-index: 99999;
          height: auto;
          display: none;
          background-color: #cccccc;
        }
      }
    }
    .menu-collapsed {
      flex: 0 0 60px;
      width: 60px;
    }
    .menu-expanded {
      flex: 0 0 230px;
      width: 230px;
    }
    .content-container {
      flex: 1;
      overflow-y: scroll;
      padding: 20px;
      .breadcrumb-container {
        .title {
          width: 200px;
          float: left;
          color: #475669;
        }
        .breadcrumb-inner {
          font-size: 16px;
          margin-bottom: 10px;
        }
      }
      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
}
.el-dropdown-menu {
  background: rgb(48, 65, 86);
  li {
    color: rgb(191, 203, 217);
    &:hover {
      background: #263445 !important;
    }
  }
}
</style>
