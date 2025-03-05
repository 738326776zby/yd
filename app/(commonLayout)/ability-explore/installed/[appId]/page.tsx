/*
 * @Author: zhangboya3 zhangboya3@xiaomi.com
 * @Date: 2025-03-05 13:57:46
 * @LastEditors: zhangboya3 zhangboya3@xiaomi.com
 * @LastEditTime: 2025-03-05 18:30:41
 * @FilePath: /yd/app/(commonLayout)/ability-explore/installed/[appId]/page.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { FC } from 'react'
import React from 'react'
import Main from '@/app/components/ability-explore/installed-app'
import Introduce from '@/app/components/ability-explore/introduce'
export type IInstalledAppProps = {
  params: {
    appId: string
  }
}

const InstalledApp: FC<IInstalledAppProps> = ({ params: { appId } }) => {
  return <div className="flex h-full gap-4 pb-6">
    <Main id={appId} />
    <Introduce />
  </div>
}
export default React.memo(InstalledApp)
