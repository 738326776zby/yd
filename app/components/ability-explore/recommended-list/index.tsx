'use client'
import { useEffect, useMemo, useState } from 'react'
import type { InstalledApp } from '@/models/explore'
import cn from '@/utils/classnames'
import { fetchInstalledAppList } from '@/service/explore'
import Input from '@/app/components/base/input'
import { useContext } from 'use-context-selector'
import s from '@/app/components/tools/style.module.css'
import ExploreContext from '@/context/explore-context'
import Empty from '../empty'
import AppCard from '../app-card'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const DefaultToolsList = () => {
  const router = useRouter()
  const { activeTabItem } = useContext(ExploreContext)
  const [allList, setAllList] = useState<InstalledApp[]>([])
  const [currentProvider, setCurrentProvider] = useState<InstalledApp>()
  const [keywords, setKeywords] = useState<string>('')
  const searchParams = useSearchParams()
  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
  }

  const getList = async () => {
    const { installed_apps }: any = await fetchInstalledAppList()
    if (installed_apps) {
      setAllList(installed_apps)
    }
  }
  useEffect(() => {
    getList()
  }, [])
  const filterList = () => {
    return allList?.filter((collection) => {
      if (keywords) {
        return Object.values(collection.app.name).some((value) =>
          value.toLowerCase().includes(keywords.toLowerCase()),
        )
      }
      return true
    })
  }


  return (
    <>
      {activeTabItem.key === 'recommended' && (
        <div className="flex h-full relative flex overflow-hidden bg-gray-100 shrink-0 h-0 grow">
          <div className="relative flex flex-col overflow-y-auto bg-gray-100 grow">
            <div
              className={cn(
                'sticky top-0 flex justify-between items-center pt-4 px-12  leading-[56px] bg-gray-100 z-20 flex-wrap gap-y-2 mb-4',
                currentProvider && 'pr-6',
              )}
            >
              <div
                className={
                  'mb-1 text-xl font-semibold items-center justify-between flex flex-1'
                }
              >
                <span className={s.textGradient}>
                  {activeTabItem?.mainTitle}
                </span>
                <div className="flex items-center gap-2">
                  <Input
                    showLeftIcon
                    showClearIcon
                    wrapperClassName="w-[200px]"
                    value={keywords}
                    onChange={(e) => handleKeywordsChange(e.target.value)}
                    onClear={() => handleKeywordsChange('')}
                  />
                </div>
              </div>
              <div className="text-gray-500 text-sm mb-2">
                {activeTabItem?.desc}
              </div>
            </div>
            <div
              className={cn(
                'relative grid content-start grid-cols-1 gap-4 px-12 pt-2 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grow shrink-0',
                currentProvider &&
                'pr-6 sm:grid-cols-1 md:grid-cols-2 ',
              )}
            >
              {filterList().map((list) => {
                return <AppCard
                  key={list.app.id}
                  collection={list.app}
                  active={list.app.id === currentProvider?.app.id}
                  onSelect={() => {
                    setCurrentProvider(list)
                    router.push(`/ability-explore/installed/${list.id}?${searchParams.toString()}`)
                  }}
                />
              })}
              {!allList.length && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Empty />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
DefaultToolsList.displayName = 'ToolDefaultToolsList'
export default DefaultToolsList
