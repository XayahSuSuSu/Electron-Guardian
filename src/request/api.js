/**
 * 上传音频
 */
import {get, post} from "src/request/request";

const address = 'http://118.24.139.23:33307'

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

/**
 * 获取照片
 */
export async function getPictures(deviceCode) {
  return await get(address + '/api/v1/pictures' + '?device_code=' + deviceCode)
}

/**
 * 上传照片
 */
export async function uploadPictures(data) {
  return await post(address + '/api/v1/pictures', data)
}

/**
 * 删除照片
 */
export async function deletePictures(data) {
  return await post(address + '/api/v1/pictures/delete', data)
}
