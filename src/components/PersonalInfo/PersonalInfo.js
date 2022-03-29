import React, { useState, useRef } from 'react'
import { Input, Button, message } from 'antd';
import OSS from 'ali-oss'
import axios from 'axios'
import './style.scss'

const PersonalInfo = (props) => {
  const [name, setName] = useState(props.username)
  const [url, setUrl] = useState(props.avatar)
  const { updateInfo } = props
  let nameRef = useRef('')
  let file = useRef({})
  let client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI5tALvdNoXMeFm1gDnYRP',
    accessKeySecret: '8qgDWs_EjZvVrbB_C3zXvG23_oXNML9ge',
    bucket: '7years-img'
  });
  const changeAvatar = () => {
    const ipt = document.getElementsByClassName('change')
    ipt[0].click()
  }
  const changeUsername = () => {
    setName(nameRef.current.state.value)
  }
  async function put (file) {
    try {
      let res = await client.put(`${file.name}`, file);
      setUrl(res.url)
      message.success('头像上传成功')
      setUrl(res.url)
    } catch (e) {
      console.log(e)
    }
  }
  const getAvatar = () => {
    const data = file.current.files[0]
    put(data)
  }
  const submitChange = () => {
    if (name.trim() === '') {
      message.warning('用户名不能为空')
    } else {
      axios({
        method: 'post',
        url: 'http://localhost:8080/api/user/changeUserInfo',
        data: {
          name: name,
          avatar: url,
          id: props.id
        }
      }).then(res => {
        if (res.data.status === 'ok') {
          message.success('信息更新成功')
          updateInfo(url, name)
        } else {
          message.error('信息更新失败')
        }
      })
    }
  }
  return (
    <div className="personal">
      <h3 className="title">编辑个人资料</h3>
      <div className="info">
        <div className="info-avatar">
          <img src={url} alt="" onClick={changeAvatar} />
          <input type="file" ref={file} className="change" onChange={getAvatar} />
        </div>
        <div className="name">
          <Input size="large" defaultValue={name} ref={nameRef} onBlur={changeUsername}></Input>
        </div>
      </div>
      <Button type="primary" size="large" onClick={submitChange}>
        提交修改
      </Button>
    </div>
  )
}

export default PersonalInfo