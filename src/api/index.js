// import request from '@/api/request'
import { get, post } from "@/api/http";

//登录获取用户数据
export const logIn = ({email,password})=>post('users/login',{email,password})

// 获取所有图书列表
// export const getCompanyDetail = () => get("后端接口名");
// { role = 'manager', id = '5f3d469cf6f9b8cd2e0e0c2d' }
// `profiles/${role}/${id}`
export const getBookList = ({ role = 'manager', id = '5f3d469cf6f9b8cd2e0e0c2d' }) => get(`profiles/${role}/${id}`)

// 查询图书列表
export const searchBookList = (query) => get(`profiles/find/1/${query}`)

// 添加图书
export const addBook = ({ id = '5f3d469cf6f9b8cd2e0e0c2d', form })=>post(`profiles/add/${id}`,form)
