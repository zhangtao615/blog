import  CryptoJS from 'crypto-js'

const cryp = (password) => {
  let secretKey = 'Tasgd1016'
  return CryptoJS.HmacSHA1(password, secretKey).toString()
}

export default cryp