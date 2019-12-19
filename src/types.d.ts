import Vue from "vue";
import VueRouter from "vue-router";
import { Route } from "vue-router";
import { Store } from 'vuex';
//原因是ts没法自动推导出vue原型上的属性，需要声明一下
declare module "vue/types/vue" {
  interface Vue {
    $api: any;
    $config: any;
    $router: VueRouter;
		$route: Route;
		$store: Store<any>;
  }
}
