import axios from "../request/http";
axios.defaults.baseURL = process.env.VUE_APP_BASEURL;
let api: object = {
  login(params: object): any {
    return axios.post("/authority/login", params);
  }
};
export default {
  api
};
