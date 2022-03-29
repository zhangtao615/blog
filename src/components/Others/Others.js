import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { message } from 'antd'
import defaultAvatar from '../../static/default_avatar.png'
import store from '../../store'
import './style.scss'
import { logoutAction } from '../../store/actionCreators'

class Others extends Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  componentDidMount() {
    store.subscribe(this.handleStoreChange)
  }
  render() {
    const { isLogin, username, avatar, admin } = this.state
    return (
      <div className="others">
        { admin === 1 &&
          <Fragment>
            <div className="write-article">
              <Link to="/write">
                <div className="write-article-btn">写文章</div>
              </Link>
            </div>
            <div className="blog-management">
              <Link to="/management">
                <div className="blog-management-btn">博客管理</div>
              </Link>
            </div>
          </Fragment>
        }
        <div className="visitor">
          <div className="visitor-avatar">
            <img src={
              isLogin ? avatar : defaultAvatar
            } alt=""/>
          </div>
          <div className="visitor-name">{ isLogin ? username : '未登录'}</div>
          { !isLogin &&
            <div className="visitor-operation">
              <Link to="/login">
                <div className="login visitor-item">登录</div>
              </Link>
              <Link to='/reg'>
                <div className="reg visitor-item">注册</div>
              </Link>
          </div>
          }
          { isLogin &&
            <Fragment>
              <Link to='/personal'>
                <div className="visitor-personal visitor-item">个人中心</div>
              </Link>
              <Link to='/'>
              <div className="visitor-logout visitor-item" onClick={this.handleLogout}>退出登录</div>
              </Link>
            </Fragment>
          }
        </div>
      </div>
    )
  }
  handleStoreChange() {
    this.setState(store.getState())
  }
  handleLogout() {
    store.dispatch(logoutAction())
    localStorage.removeItem('token')
    message.success('退出登录', 3)
  }
}
export default Others