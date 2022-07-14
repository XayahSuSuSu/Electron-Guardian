/**
 * 上传音频
 */
import {post, get} from "src/request/request";

const address = 'http://localhost:33307'

/**
 * 登录
 */
export async function login(data) {
  return await post(address + '/api/v1/login', data)
}
