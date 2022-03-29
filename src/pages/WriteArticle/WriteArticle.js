import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import E from 'wangeditor'
import { parse } from 'html-ast-parse-stringify'
import useKeypress from '../../hooks/useKeyPress'
import transferDate from '../../utils/date'
import './style.scss'
import store from '../../store'
import { message } from 'antd';
import Upload from '../../components/Upload/Upload'

let editor = null
const WriteArticle = () => {
  const [showCard, setShowCard] = useState(false)
  const [tagList, setTagList] = useState([])
  const [inputActive, setInputActive] = useState(false)
  const [selectedTag, setSelectedTag] = useState('')
  const [content, setContent] = useState('')
  const [url, setUrl] = useState('')
  const enterPressed = useKeypress(13);
  let history = useHistory()
  let articleTitle = useRef('') // 文章标题
  let tag = useRef('') // 文章标签
  let desc = useRef('') // 文章描述
  const data = store.getState()
  // 获取标签列表
  const getTagList = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8080/api/tag/getTagList',
    }).then (res => {
      setTagList(res.data.data)
    })
  }
  // 创建标签
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createTag = (tag) => {
    axios({
      method: 'POST',
      url: 'http://localhost:8080/api/tag/createTag',
      data: {
        tag: tag
      }
    }).then (() => {
      getTagList()
      setSelectedTag(tag)
      message.success('标签创建成功')
    }).catch(e => {
      message.error('标签创建失败')
    })
  }
  // 选择标签
  const selectTag = (id) => {
    tagList.map(item => {
      if (item.id === id) {
        tag.current.value = item.tag
        setSelectedTag(item.tag)
      }
    })
  }
  // 提交博客
  const saveContent = () => {
    let createTime = transferDate()
    const data = {
      title: articleTitle.current.value,
      content: JSON.stringify(parse(content)),
      tag: selectedTag,
      createTime: createTime,
      description: desc.current.value,
      pic: url
    }
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/blog/createBlog',
      data: data
    }).then(res => {
      if (res.data.status === 'ok') {
        message.success('博客创建成功')
        history.push('/')
      } else {
        message.error('博客创建失败')
      }
    })
  }
  const getImgurl = (url) => {
    setUrl(url)
  }
  useEffect (() => {
    // 处理键盘enter事件
    if (enterPressed && inputActive) {
      if (tag.current.value !== '') {
        createTag(tag.current.value)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enterPressed, inputActive])
  useEffect(() => {
    if (data.isLogin) {
      // 初始化编辑器
      editor = new E("#wang-editor")
      editor.config.onchange = function (newHtml) {
        setContent(newHtml)
      }
      editor.create()
      return () => {
        editor.destroy()
      }
    } else {
      history.push('/')
    }
  }, [])
  return (
    <div className="write-wrapper">
      <header className="blog">
        <input 
          className="input-title" 
          type="text"
          placeholder="请输入文章标题"
          ref={articleTitle}
        ></input>
      </header>
      <div className="upload">
        <Upload getUploadImg={getImgurl} />
      </div>
      <div className="editor">
        <div id='wang-editor'></div>
      </div>
      <footer className="addition">
        <div className="tag">
          <span className="tag-title">添加标签</span>
          <div className="tag-select">
            <input 
              className="tag-select-input"
              type="text"
              placeholder="选择或创建标签"
              onFocus={() => {setShowCard(true); getTagList(); setInputActive(true)}}
              onBlur={() => {setShowCard(false); setInputActive(false)}}
              ref={tag}
             />
            <div className={showCard ? "tag-select-card show" : "tag-select-card"}>
              { tagList &&
                tagList.map(item => {
                  return (
                    <div 
                      className="tag-select-card-item"
                      key={item.id}
                      onClick={() => {selectTag(item.id)}}
                    >
                      { item.tag }
                    </div>
                  )
                })
              }
              { !tagList &&
                <div className='tag-select-card-none'>
                  暂无标签
                </div>
              }
            </div>
          </div>
        </div>
        <div className="desc">
          <span className="desc-title">文章描述</span>
          <input 
            type="text"
            className="desc-input"
            placeholder="请输入文章描述"
            ref={desc}
          />
        </div>
        <div className="publish">
          <button 
            className="publish-btn"
            onClick={() => {saveContent()}}
          >发布</button>
        </div>
      </footer>
    </div>
  )
};

export default WriteArticle;