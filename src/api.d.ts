import Vue from 'vue'
//原因是ts没法自动推导出vue原型上的属性，需要声明一下
declare module 'vue/types/vue' {
	interface Vue {
		$api: any
	}
}