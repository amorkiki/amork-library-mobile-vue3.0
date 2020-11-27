// import request from '@/api/request'
import {post,get,del} from "@/api/http";

//登录获取用户数据
export const logIn = ({email,password})=>post('users/login',{email,password})

// 获取所有图书列表
// export const getCompanyDetail = () => get("后端接口名");
// { role = 'manager', id = '5f3d469cf6f9b8cd2e0e0c2d' }
// `profiles/${role}/${id}`
export const getBookList = ({ role = 'manager', id = '5f3d469cf6f9b8cd2e0e0c2d' }) => get(`profiles/${role}/${id}`)

//获取单个图书
export const getBook = (id) => get(`profiles/${id}`)
//删除单个图书
export const deleteBook = (id)=>del(`profiles/delete/${id}`)

// 查询图书列表
export const searchBookList = (query) => get(`profiles/find/1/${query}`)

// 获取所有书架列表
export const getBookshelf = () => get('bookshelf')

// 添加图书
export const addBook = ({ id = '5f3d469cf6f9b8cd2e0e0c2d', form })=>post(`profiles/add/${id}`,form)

//添加书架
export const addShelf = (shelf_name)=>post('bookshelf/add',shelf_name)