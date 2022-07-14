import axios from 'axios'

/**
 * post
 * @param {string} url
 * @param {{}} formdata
 */
export async function post(url, formdata) {
  // axios.defaults.timeout = 60000 // 1分钟请求时间
  const response = {
    code: -1, data: ''
  }
  await axios.post(url, formdata).then(function (res) {
    response.code = res.status
    response.data = res.data
    console.log(response)
  }).catch(function (err) {
    if (err.toString().indexOf('timeout') !== -1) {
      // 超时
    } else {
      // 错误
    }
    console.log(err)
  })
  return response
}


/**
 * get
 * @param {string} url
 */
export async function get(url) {
  // axios.defaults.timeout = 60000 // 1分钟请求时间
  const response = {
    code: -1,
    data: ''
  }
  await axios.get(url).then(function (res) {
    response.code = res.status
    response.data = res.data
    console.log(response)
  }).catch(function (err) {
    if (err.toString().indexOf('timeout') !== -1) {
      // 超时
    } else {
      // 错误
    }
    console.log(err)
  })
  return response
}
