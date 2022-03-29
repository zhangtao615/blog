/* eslint-disable import/no-anonymous-default-export */
import { INIT_ARTICLE_LIST, SEARCH_ARTICLE, LOGIN_SUCCESS, LOGOUT, UPDATE_INFO } from './actionTypes'

const defaultState = {
  article_list: [],
  isLogin: false,
  username: '',
  id: null,
  admin: false,
  avatar: '',
  token: localStorage.getItem('token') || ''
}

export default (state = defaultState, action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch(action.type) {
    case INIT_ARTICLE_LIST: 
      newState.article_list = action.data
      return newState
    case SEARCH_ARTICLE: 
      newState.article_list = action.data
      return newState
    case LOGIN_SUCCESS:
      const {username, id, admin, avatar} = action.data
      newState.isLogin = true
      newState.username = username
      newState.id = id
      newState.admin = admin
      newState.avatar = avatar
      return newState
    case LOGOUT:
      newState.isLogin = false
      newState.username = ''
      newState.id = null
      newState.admin = false
      newState.token = ''
      return newState
    case UPDATE_INFO:
      newState.username = action.data.name
      newState.avatar = action.data.url
      return newState
    default:
      return state
  }
}