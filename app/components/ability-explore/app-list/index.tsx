'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { useContext } from 'use-context-selector'
import useSWR from 'swr'
import { useDebounceFn } from 'ahooks'
import s from './style.module.css'
import cn from '@/utils/classnames'
import ExploreContext from '@/context/explore-context'

import AppCard from '@/app/components/ability-explore/app-card'
import { fetchAppList } from '@/service/explore'
import Loading from '@/app/components/base/loading'
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
  const { activeTabItem } = useContext(ExploreContext)
  const {
    data: { categories, allList },
  } = useSWR(
    ['/ability-explore/apps'],
    () =>
      fetchAppList().then(({ categories, recommended_apps }) => ({
        categories,
        allList: recommended_apps.sort((a, b) => a.position - b.position),
      })),
    {
      fallbackData: {
        categories: [],
        allList: [],
      },
    },
  )
  const [keywords, setKeywords] = useState('')
  const [searchKeywords, setSearchKeywords] = useState('')

  const { run: handleSearch } = useDebounceFn(
    () => {
      setSearchKeywords(keywords)
    },
    { wait: 500 },
  )

  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
    handleSearch()
  }
  const searchFilteredList = useMemo(() => {
    if (!searchKeywords || !allList || allList.length === 0) return allList

    const lowerCaseSearchKeywords = searchKeywords.toLowerCase()

    return allList.filter((item) => {
      return (
        item.app &&
        item.app.name &&
        item.app.name.toLowerCase().includes(lowerCaseSearchKeywords)
      )
    })
  }, [searchKeywords, allList])

  if (!categories || categories.length === 0) {
    return (
      <div className="flex h-full items-center">
        <Loading type="area" />
      </div>
    )
  }

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
            return <AppCard app={app} />
          })}
        </nav>
      </div>
    </div>
  )
: null
}

export default React.memo(Apps)
