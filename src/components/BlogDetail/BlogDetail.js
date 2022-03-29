import React, { useEffect } from 'react'
import { stringify } from 'html-ast-parse-stringify'

const BlogDetail = ({ detail }) => {
  useEffect (() => {
    if (detail) {
      let root = document.getElementsByClassName('blog-detail')
      let child = stringify(JSON.parse(detail))
      root[0].innerHTML = child
    }
   
  }, [detail])
  return (
    <article className="blog-detail"></article>
  )
}

export default BlogDetail