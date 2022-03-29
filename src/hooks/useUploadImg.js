import { useState } from 'react'
import OSS from 'ali-oss'


const useUploadImg = (data) => {
  const [url, setUrl] = useState('')
  let client = new OSS({
    region: 'oss-cn-beijing',
    accessKeyId: 'LTAI5tALvdNoXMeFm1gDnYRP',
    accessKeySecret: '8qgDWs_EjZvVrbB_C3zXvG23_oXNML9ge',
    bucket: '7years-img'
  });
  async function put (file) {
    try {
      let res = await client.put(`${file.name}`, file);
      setUrl(res.url)
    } catch (e) {
      console.error('error: %j', e);
    }
  }
  put(data)
  return url
}
export default useUploadImg