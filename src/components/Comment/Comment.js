import React, { useState, useRef, useEffect } from 'react'
import { Comment, List, message } from 'antd'
import { useHistory } from 'react-router-dom'
import store from '../../store'
import './style.scss'
import axios from 'axios'

const Comments = ({ id }) => {
  let comment = useRef('')
  let history = useHistory()
  const [btn, setBtn] = useState(true)
  const [commentData, setCommentData] = useState([])
  const data = store.getState()
  useEffect(() => {
    getComment()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  // 获取评论
  const getComment = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/api/user/getComment',
      params: {
        blogId: id
      }
    }).then(res => {
      if (res.data.status === 'fail') {
        message.error('评论加载失败')
      } else {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        let arr = res.data.data
        let temp = []
        arr.map((item) => {
         return temp.push({
            author: item.author,
            avatar: item.avatar,
            content: (<p>{item.content}</p>)
          })
        })
        setCommentData(temp)
      }
    })
  }
  // 评论处理
  const getInputValue = () => {
    let commentVal  = comment.current.value
    if (commentVal) {
      setBtn(false)
    } else {
      setBtn(true)
    }
  }
  // 发送评论
  const sendCommit = () => {
    if (!data.isLogin) {
      message.warn('未登录, 2s后即将跳转到登陆界面', 2)
      setTimeout(() => {
        history.push('/login')
      }, 2000)
      return 
    }
    axios({
      url:'http://localhost:8080/api/user/handleCommit',
      method: 'POST',
      data: {
        content: comment.current.value,
        author: data.username,
        avatar: data.avatar,
        blogId: id
      }
    }).then(res => {
      if (res.data.status === 'ok') {
        message.success('评论成功')
        comment.current.value = ''
        getComment()
      } else {
        message.error('评论成功')
      }
    })
  }
  return (
    <div className="comment-wrapper">
      <div className="input-comment">
        <input 
          type="text" 
          ref={comment} 
          placeholder="输入评论..." 
          onChange={() => {getInputValue()}}
        />
        <button  
          className="input-comment-btn"
          onClick={() => {sendCommit()}}
          disabled={btn}
        >
          发布
        </button>
      </div>
      <div className="comment-list">
        <List
          header={`${commentData.length} 评论`}
          itemLayout="horizontal"
          dataSource={commentData}
          renderItem={item => (
            <li>
              <Comment
                author={item.author}
                avatar={item.avatar}
                content={item.content}
              />
              <hr></hr>
            </li>
          )}
        />
      </div>
    </div>
  )
}

export default Comments