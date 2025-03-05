'use client'
import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useContext } from 'use-context-selector'
import ExploreContext from '@/context/explore-context'
import TextGenerationApp from '@/app/components/share/text-generation'
import Loading from '@/app/components/base/loading'
import ChatWithHistory from '@/app/components/base/chat/chat-with-history'
import { fetchInstalledAppList as doFetchInstalledAppList} from '@/service/ability-explore'
export type IInstalledAppProps = {
  id: string
}

const InstalledApp: FC<IInstalledAppProps> = ({
  id,
}) => {
  const { activeTabItem,setInstalledApps,installedApps } = useContext(ExploreContext)
  const installedApp = installedApps?.find(item => item.id === id)
  const fetchInstalledAppList = async () => {
    const { installed_apps }: any = await doFetchInstalledAppList()
    setInstalledApps(installed_apps)
  }
  useEffect(()=>{
      // 如果刷新页面没有 installedApps 信息，那么就重新获取
      if (!installedApps?.length) {
        fetchInstalledAppList()
      }
  },[])
  if (!installedApp) {
    return (
      <div className='flex h-full items-center'>
        <Loading type='area' />
      </div>
    )
  }

  return (
    <div className='h-full  pl-4 pr-2 px-4 mt-6 grow'>
      {installedApp.app.mode !== 'completion' && installedApp.app.mode !== 'workflow' && (
        <ChatWithHistory installedAppInfo={installedApp} className='rounded-2xl shadow-md overflow-hidden' />
      )}
      {installedApp.app.mode === 'completion' && (
        <TextGenerationApp isInstalledApp installedAppInfo={installedApp}/>
      )}
      {installedApp.app.mode === 'workflow' && (
        <TextGenerationApp isWorkflow isInstalledApp installedAppInfo={installedApp}/>
      )}
    </div>
  )
}
export default React.memo(InstalledApp)
