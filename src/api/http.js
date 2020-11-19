import axios from "axios"; // 引用axios
// import request from "@/api/request";

const instance = axios.create({
  baseURL: 'http://localhost:5000/api/',
  timeout: 60000,
});


// 通过axios请求拦截器，添加token
instance.interceptors.request.use(config => {
  // console.log(config) //ok
  config.headers.Authorization = window.sessionStorage.getItem('token')

  return config
})

//get请求
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
//post请求
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(
      (response) => {
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
