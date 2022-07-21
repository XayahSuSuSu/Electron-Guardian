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

/**
 * 检查服务器连接
 */
export async function checkServer() {
  return await get(address + '/api/v1/check')
}

/**
 * 获取设备状态
 */
export async function getState(deviceCode) {
  return await get(address + '/api/v1/state' + '?device_code=' + deviceCode)
}

/**
 * 获取地图
 */
export async function getMap(deviceCode) {
  return await get(address + '/api/v1/map' + '?device_code=' + deviceCode)
}

/**
 * 删除地图
 */
export async function deleteMap(data) {
  return await post(address + '/api/v1/map/delete', data)
}
