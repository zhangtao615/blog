import React, { useRef, useState, Fragment } from 'react'
import { message } from 'antd'
import upload from '../../utils/uploadImg'
import './style.scss'

const Upload = (props) => {
  const { getUploadImg } = props
  let file = useRef(null)
  const [url, setUrl] = useState('')
  const uploadImg = async (file) => {
    const data = file.current.files[0]
    const res = await upload(data)
    if (res.url) {
      setUrl(res.url)
      getUploadImg(res.url)
      message.success('图片上传成功')
    } else {
      message.error('图片上传失败')
    }
  }
  const deleteBanner = () => {
    setUrl('')
    getUploadImg('')
  }
  return (
    <Fragment>
    { !url && 
      <div className="file">
        上传封面
        <input type="file" ref={file} onChange={() => {uploadImg(file)}}/>
      </div> 
    }
    { url &&
      <div className="blog-banner">
        <div className="change-banner" onClick={() => {deleteBanner()}}>删除</div>
        <img src={url} alt="" />
      </div>
    }
    </Fragment>
  )
}
export default Upload