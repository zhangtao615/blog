import React , { useRef, useEffect, useState } from 'react';
import { searchArticleAction } from '../../store/actionCreators'
import store from '../../store'
import useKeypress from '../../hooks/useKeyPress'
import './SiderBar.scss';
import axios from 'axios';

const SiderBar = () => {
  const [inputActive, setinputActive] = useState(false);
  const [storeData, setStoreData] = useState({})
  const enterPressed = useKeypress(13);
  const [tagList, setTagList] = useState([])
  let searchValue = useRef(null)
  const handleStoreChange = () => {
    setStoreData(store.getState())
  }
  useEffect(() => {
    handleStoreChange()
    getTagList()
  }, [])
  useEffect(() => {
    if (enterPressed && inputActive) {
      store.dispatch(searchArticleAction(searchValue.current.value))
      searchValue.current.value = ''
    }
  }, [inputActive, enterPressed])
  // 获取标签列表
  const getTagList = () => {
    axios({
      method: 'GET',
      url: 'http://localhost:8080/api/tag/getTagList'
    }).then(res => {
      setTagList(res.data.data)
    })
  }
  // 获取标签对应的文章
  const getBlogByTag = (tag) => {
    console.log(tag)
  }
  return (
    <div className="sider-bar">
      {/* 搜索文章 */}
      <div className="search">
        <input 
          type="text" 
          placeholder="搜索文章"
          onFocus={() => {setinputActive(true)}}
          onBlur={() => {setinputActive(false)}}
          ref={searchValue}
        />
      </div>
      {/* 文章类型 */}
      <div className="category">
        <div className="category-title">文章分类</div>
        <ul className="category-list"> 
          { tagList.map(item => {
              return <li
                      className="category-list-item"
                      onClick={() => {getBlogByTag(item.tag)}}
                      key={item.id}>
                        <span className="category-list-item-title">{item.tag}</span>
                    </li>
            })
          }
        </ul>
      </div>
    </div>
  )
}
export default SiderBar;