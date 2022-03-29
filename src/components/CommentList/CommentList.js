import React, { useEffect, useState } from 'react'
import { List, message } from 'antd';
import axios from 'axios';
import './style.scss'

const CommentList = (props) => {
  const { username } = props
  const [list, setList] = useState([])
  useEffect(() => {
    getCommentList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getCommentList = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/blog/getUserComments?username=' + username,
    }).then(({ data }) => {
      setList(data.data)
    })
  }
  const deleteComment = (id) => {
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/blog/deleteComment',
      data: {
        id: id
      }
    }).then(res => {
      if (res.data.status === 'ok') {
        message.success(res.data.message)
        getCommentList()
      }
    })
  }
  
  return (
    <div>
      <List
        className="list"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[<span className="list-operation" key={item.id} onClick={() => {deleteComment(item.id)}}>删除</span>]}
          >
            <List.Item.Meta
              title={<span>{item.content}</span>}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default CommentList