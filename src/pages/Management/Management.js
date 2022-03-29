import React, { useEffect, useState } from 'react'
import { Button, message, Empty } from 'antd'
import { useHistory } from 'react-router-dom'
import store from '../../store'
import axios from 'axios'
import './style.scss'

const Management = () => {
  let history = useHistory()
  const [list, setList] = useState([])
  const data = store.getState()
  useEffect ( () => {
    if (data.admin) {
      getBlogList()
    } else {
      history.push('/')
    }
  }, [])
  const getBlogList = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/api/blog/getBlogList'
    }).then(({data}) => {
      setList(data.data)
    })
  }
  const deleteBlog = (id) => {
    axios({
      method: "POST",
      url: 'http://localhost:8080/api/blog/deleteBlog',
      data: {
        id: id
      }
    }).then(res => {
      if (res.data.status === 'ok') {
        message.success(res.data.message)
        getBlogList()
      }
    })
  }
  return (
    <div className="management-wrapper">
      <div className="title">博客列表</div>
      { list &&
        list.map(item => {
          return <div className="list" key={item.id}>
                    <div className="item">
                      <div className="item-title">{item.title}</div>
                      <div className="item-desc">{item.description}</div>
                    </div>
                    <div className="list-btn">
                      <Button type="primary" onClick={() => {deleteBlog(item.id)}} danger>删除</Button>
                    </div>
                  </div>
        })
      }
      { !list &&
        <Empty description="暂无文章" />
      }
    </div>
  )
}

export default Management