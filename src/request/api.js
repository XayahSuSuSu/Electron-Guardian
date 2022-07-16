/**
 * 上传音频
 */
import {post, get} from "src/request/request";

const address = 'http://localhost:33307'

export default address

/**
 * 登录
 */
export async function login(data) {
  return await post(address + '/api/v1/login', data)
}

/**
 * 获取授权二维码
 */
export async function getAuthorizeQRCode() {
  return await get(address + '/api/v1/authorize')
}

/**
 * 检查授权状态
 */
export async function checkAuthorizeQRCode(id) {
  return await get(address + '/api/v1/authorize' + '?id=' + id)
}

/**
 * 获取设备列表
 */
export async function getDevices() {
  return await get(address + '/api/v1/device')
}

/**
 * 添加设备
 */
export async function addDevice() {
  return await post(address + '/api/v1/device', new FormData())
}
