import React, { useState, useEffect } from 'react'
import { Spin } from 'antd'
import axios from 'axios'
import Comment from '../../components/Comment/Comment'
import BlogDetail from '../../components/BlogDetail/BlogDetail'
import './style.scss'
import { Fragment } from 'react'

const Detail = () => {
  const [article, setArticle] = useState({})
  const [loading, setLoading] = useState(true)
  let id = window.location.href.split('/').pop()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
    const id = window.location.href.split('/').pop()
    axios.get('http://localhost:8080/api/blog/getBlogDetail?id=' + id)
    .then(res => {
      setArticle(res.data.data[0])
      setLoading(false)
    })
  }, [])
  return (
    <Fragment>
      { !loading &&
        <div className="view-details">
          <header className="header">
          <img className="header-cover" src={article.pic} alt=""/>
          <h1 className="header-title">{article.title}</h1>
          <ul className="header-info">
            <li className="header-info-date header-info-item">
            <i className="iconfont">&#xe774;</i> <span className="date">{article.createTime}</span>
            </li>
            <li className="header-info-count header-info-item">
              <i className="iconfont">&#xe661;</i> <span className="count">{article.tag}</span>
            </li>
          </ul>
          </header>
          <article className="article">
            <BlogDetail detail={article.content} />
          </article>  
          <footer className="comment">
            <Comment id={id}/>
          </footer>
        </div>
      }
      { loading &&
        <div className="loading">
          <Spin size="large" />
        </div>
      }
    </Fragment>
  )
}
export default Detail