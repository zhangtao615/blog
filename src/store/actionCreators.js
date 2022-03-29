import { INIT_ARTICLE_LIST, IS_LOGIN, LOGOUT, LOGIN_SUCCESS, UPDATE_INFO } from './actionTypes'
import axios from 'axios'
import { message } from 'antd'

export const initArticleListAction = (data) => ({
  type: INIT_ARTICLE_LIST,
  data
})

export const getArticleListAction = () => {
  return (dispatch) => {
    axios.get('http://localhost:8080/api/blog/getBlogList').then(res => {
      const data = res.data.data
      dispatch(initArticleListAction(data))
    })
  }
}

export const searchArticleAction = (value) => {
  return (dispatch) => {
    axios({
      method: "GET",
      url: "http://localhost:8080/api/blog/getBlogList",
      params: {
        keyword: value
      }
    }).then(res => {
      const data = res.data.data
      dispatch(initArticleListAction(data))
    })
  }
}
export const isLoginAction = (data) => ({
  type: IS_LOGIN,
  data
})

export const getCurrentUser = (token) => {
  return (dispatch) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    axios({
      method: 'GET',
      url: 'http://localhost:8080/api/user/getCurrentUser'
    }).then(res => {
      if (res.data.status === 'ok') {
        dispatch(loginSuccess(res.data.data))
      } else {
        message.error('登陆失败')
      }
    })
  }
}
export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data
})
export const logoutAction = () => ({
  type: LOGOUT
})
export const updateInfo = (url, name) => ({
  type: UPDATE_INFO,
  data: {
    url: url,
    name: name
  }
})