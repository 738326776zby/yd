'use client'

import React, { useMemo, useState,useEffect } from 'react'
import { useContext } from 'use-context-selector'
import { useDebounceFn } from 'ahooks'
import s from './style.module.css'
import cn from '@/utils/classnames'
import ExploreContext from '@/context/explore-context'
import AppCard from '@/app/components/ability-explore/app-card'
import { fetchInstalledAppList as doFetchInstalledAppList} from '@/service/ability-explore'
import Input from '@/app/components/base/input'

type AppsProps = {
  pageType?: PageType
  onSuccess?: () => void
}

export enum PageType {
  EXPLORE = 'explore',
  CREATE = 'create',
}

const Apps = () => {
  const { activeTabItem,setInstalledApps,installedApps } = useContext(ExploreContext)

  const [keywords, setKeywords] = useState('')
  const [searchKeywords, setSearchKeywords] = useState('')

  const { run: handleSearch } = useDebounceFn(
    () => {
      setSearchKeywords(keywords)
    },
    { wait: 500 },
  )
  const fetchInstalledAppList = async () => {
    const { installed_apps }: any = await doFetchInstalledAppList()
    setInstalledApps(installed_apps)
  }
  useEffect(() => {
    fetchInstalledAppList()
  }, [])
  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
    handleSearch()
  }
  const searchFilteredList = useMemo(() => {
    if (!searchKeywords || !installedApps || installedApps.length === 0) return installedApps

    const lowerCaseSearchKeywords = searchKeywords.toLowerCase()

    return installedApps.filter((item) => {
      return (
        item.app &&
        item.app.name &&
        item.app.name.toLowerCase().includes(lowerCaseSearchKeywords)
      )
    })
  }, [searchKeywords, installedApps])



  return activeTabItem.key === 'owned'? (
    <div className={cn('flex flex-col', 'h-full border-l border-gray-200')}>
      <div className="shrink-0 pt-6 px-12 ">
        <div
          className={
            'mb-1 text-xl font-semibold items-center justify-between flex'
          }
        >
          <span className={s.textGradient}>{activeTabItem?.mainTitle}</span>
          <Input
            showLeftIcon
            showClearIcon
            wrapperClassName="w-[200px]"
            value={keywords}
            onChange={(e) => handleKeywordsChange(e.target.value)}
            onClear={() => handleKeywordsChange('')}
          />
        </div>
        <div className="text-gray-500 text-sm">{activeTabItem?.desc}</div>
      </div>
      <div
        className={
          'relative flex flex-1 pb-6 flex-col overflow-auto bg-gray-100 shrink-0 grow mt-4'
        }
      >
        <nav
          className={cn(
            s.appList,
            'grid content-start shrink-0',
            'gap-4 px-6 sm:px-12',
          )}
        >
          {searchFilteredList.map((app) => {

            //@ts-ignore
            return <AppCard app={app} />
          })}
        </nav>
      </div>
    </div>
  )
: null
}

export default React.memo(Apps)
