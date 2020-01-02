import axios from "../request/http";
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
//权限管理
const authority: object = {
  //添加权限菜单
  insertMenu(params: object): any {
    return axios.post("rest/menu/insertMenu", params);
  },
  //添加权限菜单
  findMenuById(params: object): any {
    return axios.post("rest/menu/findMenuById", params);
  },
  //修改菜单信息按钮
  updateMenu(params: object): any {
    return axios.post("rest/menu/updateMenu", params);
  },
  //修改菜单状态按钮
  updateMenuEnable(params: object): any {
    return axios.post("rest/menu/updateMenuEnable", params);
  },
  //获取所有菜单
  findMenuAllList(params: object = {}): any {
    return axios.post("rest/menu/findMenuAllList", params);
  },
  //所有菜单分页
  findMenuAllPage(params: object = {}): any {
    return axios.post("rest/menu/findMenuAllPage", params);
  },
  //获取当前所有子节点
  findMenuNodes(params: object): any {
    return axios.post("rest/menu/findMenuNodes", params);
  },
  //获取菜单树结构
  findMenuZtree(params: object): any {
    return axios.post("rest/menu/findMenuZtree", params);
  },
  //删除菜单
  delMenu(params: object): any {
    return axios.post("rest/menu/delMenu", params);
  },
  //给用户分配权限
  saveAuthToUser(params: object): any {
    return axios.post("rest/roleauth/saveAuthToUser", params);
  },
  //查看用户的权限
  findAuthByUser(params: object): any {
    return axios.post("rest/roleauth/findAuthByUser", params);
  }
};
export default {
  authority
};
