const transferDate = () => {
  let date = new Date()
  let years = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return `${years}年${month}月${day}日`
}

export default transferDate