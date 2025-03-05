'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { RiCloseLine } from '@remixicon/react'
import { useContext } from 'use-context-selector'
import { useDebounceFn } from 'ahooks'
import s from './style.module.css'
import cn from '@/utils/classnames'
import ExploreContext from '@/context/explore-context'
import AppCard from '@/app/components/ability-explore/app-card'
import { fetchCollectionList  } from '@/service/ability-explore'
import Input from '@/app/components/base/input'
import { Collection } from '@/models/ability-explore';
import Empty from '@/app/components/ability-explore/empty'
import ProviderDetail from '@/app/components/ability-explore/provider/detail'
type AppsProps = {
  pageType?: PageType
  onSuccess?: () => void
}

export enum PageType {
  EXPLORE = 'explore',
  CREATE = 'create',
}

const Apps = () => {
  const { activeTabItem, setInstalledApps, installedApps } = useContext(ExploreContext)

  const [keywords, setKeywords] = useState('')
  const [searchKeywords, setSearchKeywords] = useState('')
  // 存储当前选中的卡片
  const [currentProvider, setCurrentProvider] = useState<Collection | undefined>()
  const { run: handleSearch } = useDebounceFn(
    () => {
      setSearchKeywords(keywords)
    },
    { wait: 500 },
  )
  const getProviderList = async () => {
    const list = await fetchCollectionList()
    setInstalledApps([...list])
  }
  useEffect(() => {
    getProviderList()
  }, [])
  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
    handleSearch()
  }
  const searchFilteredList = useMemo(() => {
    return installedApps.filter((collection) => {
      if (keywords)
        return Object.values(collection.label).some(value => (value as string).toLowerCase().includes(keywords.toLowerCase()))
      return true
    })
  }, [searchKeywords, installedApps])



  return activeTabItem.key === 'owned' ? (
    <div className={cn('flex ', 'h-full  border-gray-200 relative')}>
      <div className='relative flex flex-col overflow-y-auto bg-gray-100 grow'>
        <div className="shrink-0 pt-6 ">
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
              'gap-4 ',
            )}
          >
            {searchFilteredList.map((collection) => {

              //@ts-ignore
              return <AppCard collection={collection} onSelect={() => setCurrentProvider(collection)} />
            })}
            {!searchFilteredList.length && <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'><Empty /></div>}
          </nav>
        </div>
      </div>
      <div className={cn(
        'shrink-0 w-0 border-l-[0.5px] border-black/8 overflow-y-auto transition-all duration-200 ease-in-out',
        currentProvider && 'w-[420px]  bg-components-panel-bg',
      )}>
        {currentProvider && <ProviderDetail collection={currentProvider} onRefreshData={getProviderList} />}
        <div className='absolute top-5 right-5 p-1 cursor-pointer' onClick={() => setCurrentProvider(undefined)}><RiCloseLine className='w-4 h-4' /></div>
      </div>
    </div>
  )
    : null
}

export default React.memo(Apps)
