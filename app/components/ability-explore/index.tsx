/*
 * @Author: zhangboya3 zhangboya3@xiaomi.com
 * @Date: 2025-03-05 15:42:20
 * @LastEditors: zhangboya3 zhangboya3@xiaomi.com
 * @LastEditTime: 2025-03-05 21:06:23
 * @FilePath: /yd/app/components/ability-explore/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import ExploreContext from '@/context/explore-context'
import Sidebar from '@/app/components/ability-explore/sidebar'
import { useAppContext } from '@/context/app-context'
import type { Collection } from '@/models/ability-explore'

export type IExploreProps = {
  children: React.ReactNode
}

const Explore: FC<IExploreProps> = ({
  children,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { userProfile, isCurrentWorkspaceDatasetOperator } = useAppContext()
  const [installedApps, setInstalledApps] = useState<Collection[]>([])
  const [activeTabItem, setActiveTabItem] = useState({})
  useEffect(() => {
    document.title = `${t('explore.title')} -  Dify`;
  }, [])

  useEffect(() => {
    if (isCurrentWorkspaceDatasetOperator)
      return router.replace('/datasets')
  }, [isCurrentWorkspaceDatasetOperator])

  return (
    <div className='flex h-full bg-gray-100 border-t border-gray-200 overflow-hidden'>
      <ExploreContext.Provider
        value={
          {
            setInstalledApps,
            setActiveTabItem,
            //@ts-ignore
            activeTabItem,
            installedApps
          }
        }
      >
        <Sidebar setActiveTabItem={setActiveTabItem} />
        <div className='grow w-0 px-6'>
          {children}
        </div>
      </ExploreContext.Provider>
    </div>
  )
}
export default React.memo(Explore)
