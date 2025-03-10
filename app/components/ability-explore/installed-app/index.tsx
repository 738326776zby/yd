'use client'
import  { FC,useState,useEffect } from 'react'
import React from 'react'
import { useContext } from 'use-context-selector'
import ExploreContext from '@/context/explore-context'
import TextGenerationApp from '@/app/components/share/text-generation'
import Loading from '@/app/components/base/loading'
import ChatWithHistory from '@/app/components/base/chat/chat-with-history'
import type { Collection } from '@/models/ability-explore'
import { fetchInstalledAppList } from '@/service/explore'
import type { InstalledApp } from '@/models/explore'
import Introduce from '@/app/components/ability-explore/introduce'
export type ItargetDataProps = {
  id: string
}

const InstalledApp: FC<ItargetDataProps> = ({
  id
}) => {
  const [targetData,setTargetData] = useState<InstalledApp |undefined>(undefined)
  useEffect(()=>{
    const fetchData = async () => {
      const { installed_apps }: any = await fetchInstalledAppList()
      //@ts-ignore
      const target = installed_apps.filter((item)=>item.id==id)
      console.log(target.length ? target[0] : undefined)
      setTargetData(target.length? target[0] : undefined)
    }
    fetchData()
  },[])

  if (!targetData) {
    return (
      <div className='flex h-full items-center'>
        <Loading type='area' />
      </div>
    )
  }

  return (
    <div className='h-full py-2 pl-0 pr-2 sm:p-2 mt-4 flex gap-4' >
      {targetData.app.mode !== 'completion' && targetData.app.mode !== 'workflow' && (
         <ChatWithHistory installedAppInfo={targetData} className='rounded-2xl shadow-md overflow-hidden flex-1' />
      )}
      {targetData.app.mode === 'completion' && (
          <TextGenerationApp isInstalledApp installedAppInfo={targetData}/>
      )}
      {targetData.app.mode === 'workflow' && (
        <TextGenerationApp isWorkflow isInstalledApp installedAppInfo={targetData}/>
      )}
      <Introduce/>
    </div>
  )
}
export default React.memo(InstalledApp)
