/*
 * @Author: zhangboya3 zhangboya3@xiaomi.com
 * @Date: 2025-03-05 16:51:43
 * @LastEditors: zhangboya3 zhangboya3@xiaomi.com
 * @LastEditTime: 2025-03-05 17:00:58
 * @FilePath: /yd/service/ability-explore.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { del, get, patch, post } from './base'


export const fetchInstalledAppList = (app_id?: string | null) => {
  return get(`/installed-apps${app_id ? `?app_id=${app_id}` : ''}`)
}
