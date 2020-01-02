<template>
  <el-col :span="24" class="header">
    <el-col :span="10" class="logo">
      <router-link to="/home" class="color-fff">采购决策管理系统</router-link>
    </el-col>
    <el-col :span="10"></el-col>
    <el-col :span="4" class="userinfo">
      <el-dropdown trigger="hover">
        <span class="el-dropdown-link userinfo-inner"> <img src="../assets/images/common/user.png" /> {{ userName }} </span>
        <el-dropdown-menu slot="dropdown" class="custom">
          <el-dropdown-item @click.native="showDialogHandle()">修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <!-- <show-dialog :dialogData="dialogData" :submitLoading="submitLoading" :dialogVisible.sync="showDialog" @getCancel="handleCancel" @closeBindWarnStandard="handleCancel" @submitHandle="submitHandle">
    </show-dialog> -->
  </el-col>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import ChangePassword from "./ChangePassword.vue";
@Component({
  components: {
    // "show-dialog": ChangePassword
  }
})
export default class AdminHeader extends Vue {
  //data
  private userName: string = "";
  private functions: [] = []; //原菜单
  private filterFunctions: [] = []; //过滤后菜单
  private showDialog: boolean = false; //显示修改密码弹窗
  private submitLoading: boolean = false; //弹窗确定loading
  private loadingBtn: boolean = false;

  //表单数据
  private dialogData: object = {
    password: "",
    checkPass: ""
  };
  //created
  created() {
    //展示用户名
    if (localStorage.userInfo) {
      this.userName = JSON.parse(localStorage.userInfo).name;
    }
    // if (localStorage.functions.length > 0) {
    //   this.functions = JSON.parse(localStorage.functions);
    //   this.functions.forEach(item => {
    //     if (item.functionCode) {
    //       this.filterFunctions.push(item.functionCode);
    //     }
    //   });
    // }
  }
  //methods
  //弹窗
  showDialogHandle() {
    this.showDialog = true; //显示弹窗
    //此处不能直接设置为this.dialogData = {}  会导致在弹窗校验时报错 undefined
    this.dialogData = {
      password: "",
      checkPass: ""
    };
  }
  //点击弹框下的取消
  handleCancel() {
    this.showDialog = false;
  }
  //确定修改密码
  submitHandle(formData: any) {
    //后台要求传的参数
    let params: object = {
      id: localStorage.userInfo ? JSON.parse(localStorage.userInfo).id : "", //userId
      password: formData.password //密码
    };
    this.loadingBtn = true;
    this.$api.user
      .updateSeedUserPassword(params)
      .then((res: any) => {
        if (res.data.code === this.$config.RET_CODE.SUCCESS_CODE) {
          this.loadingBtn = false;
          this.showDialog = false;
          this.$message.success("修改成功，请登录");
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        } else if (res.data.code === this.$config.RET_CODE.ERROR_CODE) {
          this.$message.error(res.data.msg);
          this.loadingBtn = false;
        }
      })
      .catch((err: string) => {
        console.log(err);
        this.loadingBtn = false;
      });
  }
  //退出
  logout() {
    localStorage.removeItem("token"); //清除token
    localStorage.removeItem("userInfo"); //清除userInfo
    this.$router.push("/login");
  }
}
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  background: #304156;
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
        vertical-align: middle;
      }
    }
  }
  .logo {
    //width:230px;
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
    img {
      float: left;
      margin: 5px 10px 10px 0px;
      width: 92px;
      height: auto;
      padding: 10px;
    }
    .txt {
      color: #fff;
    }
  }
}
</style>
