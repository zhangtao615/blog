import React, { useRef } from 'react'
import store from '../../store'
import { getCurrentUser } from '../../store/actionCreators'
import axios from 'axios'
import { useHistory } from 'react-router-dom' 
import { message } from 'antd';
import cryp from '../../utils/cryp'
import './style.scss'

const Login = () => {
  const username = useRef('')
  const password = useRef('')
  let history = useHistory();
  const handleLogin = async(username, password) => {
    const crypPassword = cryp(password)
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: 'http://localhost:8080/api/user/login',
        withCredentials: true,
        data: {
          username: username,
          password: crypPassword
        }
      }).then(res => {
        resolve(res)
      })
    })
      
  }
  const loginBtn = async() => {
    let name = username.current.value
    let pass = password.current.value
    if (name && pass) {
      const res = await handleLogin(name, pass)
      if (res.data.status === 'ok') {
        localStorage.setItem('token', res.data.message)
        store.dispatch(getCurrentUser(res.data.message))
        message.success('登录成功', 1)
        history.push('/')
      } else {
        message.error('用户名或密码错误', 3)
      }
    } else if (!name) {
      message.warn('用户名未填写')
    } else {
      message.warn('密码未填写')
    }
    
  }
  return (
    <div className="login-wrapper">
      <div className="card">
        <header className="card-header">
          欢迎，请登陆你的账号
        </header>
        <div className="card-operation">
          <div className="card-operation-username">
            <i className="iconfont icon">&#xe60f;</i>
            <input className="ipt" ref={username} type="text" placeholder="请输入用户名" />
          </div>
          <div className="card-operation-password">
            <i className="iconfont icon">&#xe608;</i>
            <input className="ipt" ref={password} type="password" placeholder="请输入密码" />
          </div>
          <div className="card-operation-submit">
            <button type="submit" className="card-operation-submit-btn" onClick={() => {loginBtn()}}>登录</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login