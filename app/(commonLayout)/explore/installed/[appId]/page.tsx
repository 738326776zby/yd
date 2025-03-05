/*
 * @Author: zhangboya3 zhangboya3@xiaomi.com
 * @Date: 2025-03-05 13:57:46
 * @LastEditors: zhangboya3 zhangboya3@xiaomi.com
 * @LastEditTime: 2025-03-05 17:31:30
 * @FilePath: /yd/app/(commonLayout)/explore/installed/[appId]/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { FC } from 'react'
import React from 'react'
import Main from '@/app/components/explore/installed-app'

export type IInstalledAppProps = {
  params: {
    appId: string
  }
}

const InstalledApp: FC<IInstalledAppProps> = ({ params: { appId } }) => {
  return (
    <Main id={appId} />
  )
}
export default React.memo(InstalledApp)
