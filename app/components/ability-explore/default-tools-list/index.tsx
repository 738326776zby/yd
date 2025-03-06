'use client'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RiCloseLine } from '@remixicon/react'
import type {
  Collection,
  DefaultToolsListItem,
  DefaultToolsListResponse,
} from '@/models/ability-explore'
import cn from '@/utils/classnames'
import { useTabSearchParams } from '@/hooks/use-tab-searchparams'
import TabSliderNew from '@/app/components/base/tab-slider-new'
import LabelFilter from '@/app/components/tools/labels/filter'
import Input from '@/app/components/base/input'
import { DotsGrid } from '@/app/components/base/icons/src/vender/line/general'
import { Colors } from '@/app/components/base/icons/src/vender/line/others'
import { Route } from '@/app/components/base/icons/src/vender/line/mapsAndTravel'
import CustomCreateCard from '@/app/components/tools/provider/custom-create-card'
import ContributeCard from '@/app/components/tools/provider/contribute'
import ProviderCard from '@/app/components/tools/provider/card'
import ProviderDetail from '@/app/components/tools/provider/detail'
// import Empty from '@/app/components/tools/add-tool-modal/empty'
import { fetchCollectionList } from '@/service/tools'
import { useContext } from 'use-context-selector'
import s from '@/app/components/tools/style.module.css'
import ExploreContext from '@/context/explore-context'
import test from './test.json'
import Empty from './empty'
const DefaultToolsList = () => {
  const { t } = useTranslation()
  const { activeTabItem } = useContext(ExploreContext)
  const [activeTab, setActiveTab] = useTabSearchParams({
    defaultTab: '',
  })
  const options = [
    { value: '', text: '全部' },
    { value: 'xinxijiansuo', text: '信息检索类' },
    { value: 'wenben', text: '文本解析类' },
    { value: 'wendangchuli', text: '文档处理类' },
  ]
  const [tagFilterValue, setTagFilterValue] = useState<string[]>([])
  const handleTagsChange = (value: string[]) => {
    setTagFilterValue(value)
  }
  const [keywords, setKeywords] = useState<string>('')
  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
  }

  const [collectionList, setCollectionList] = useState<Collection[]>([])
  const [xinxijiansuo, setXinxijiansuo] =
    useState<DefaultToolsListItem>(undefined)
  const [wenben, setWenben] = useState<DefaultToolsListItem>(undefined)
  const [wendangchuli, setWendangchuli] =
    useState<DefaultToolsListItem>(undefined)
  const filterList = (list: Collection[], key: string) => {
    if (activeTab === key || activeTab === '') {
      return list?.filter((collection) => {
        if (
          tagFilterValue.length > 0 &&
          (!collection.labels ||
            collection.labels.every((label) => !tagFilterValue.includes(label)))
        )
          return false
        if (keywords) {
          return Object.values(collection.label).some((value) =>
            value.toLowerCase().includes(keywords.toLowerCase()),
          )
        }
        return true
      })
    } else {
      return []
    }
  }

  const getDefaultToolsList = async () => {
    // const list = await fetchCollectionList()
    // @ts-ignore
    const { xinxijiansuo, wenben, wendangchuli } =
      test as DefaultToolsListResponse
    setXinxijiansuo(xinxijiansuo)
    setWenben(wendangchuli)
    setWendangchuli(wendangchuli)
  }
  useEffect(() => {
    getDefaultToolsList()
  }, [])

  const [currentProvider, setCurrentProvider] = useState<
    Collection | undefined
  >()
  useEffect(() => {
    if (currentProvider && collectionList.length > 0) {
      const newCurrentProvider = collectionList.find(
        (collection) => collection.id === currentProvider.id,
      )
      setCurrentProvider(newCurrentProvider)
    }
  }, [collectionList, currentProvider])
  const wenbenList = filterList(wenben?.list, 'wenben')
  const xinxijiansuoList = filterList(xinxijiansuo?.list, 'xinxijiansuo')
  const wendangchuliList = filterList(wendangchuli?.list, 'wendangchuli')
  return (
    <>
      {activeTabItem.key === 'defaultTools' && (
        <div className="flex h-full relative flex overflow-hidden bg-gray-100 shrink-0 h-0 grow">
          <div className="relative flex flex-col overflow-y-auto bg-gray-100 grow">
            <div
              className={cn(
                'sticky top-0 flex justify-between items-center pt-4 px-12 pb-2 leading-[56px] bg-gray-100 z-20 flex-wrap gap-y-2',
                currentProvider && 'pr-6',
              )}
            >
              <div>
                <div className="shrink-0 pt-6 mb-4">
                  <div
                    className={
                      'mb-1 text-xl font-semibold items-center justify-between flex'
                    }
                  >
                    <span className={s.textGradient}>
                      {activeTabItem?.mainTitle}
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm">
                    {activeTabItem?.desc}
                  </div>
                </div>
                <TabSliderNew
                  value={activeTab}
                  onChange={(state) => {
                    setActiveTab(state)
                    if (state !== activeTab) setCurrentProvider(undefined)
                  }}
                  options={options}
                />
              </div>

              <div className="flex items-center gap-2">
                <LabelFilter
                  value={tagFilterValue}
                  onChange={handleTagsChange}
                />
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
            {(activeTab === 'xinxijiansuo' || activeTab === '') &&
              xinxijiansuoList.length > 0 && (
                <>
                  <div className="flex my-1 px-12">
                    <span className="font-bold text-[14px] text-[#495464] mr-4">
                      信息检索类
                    </span>
                    <div>
                      <span className="icon iconfont icon-reserved-fill text-[#FF9F69] mr-1"></span>
                      <span className="text-[#495464] text-[14px]">
                        共<span className="text-[#155EEF] mx-1">XX</span>
                        个工具集，合计
                        <span className="text-[#155EEF] mx-1">XX</span>
                        个工具
                      </span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'relative grid content-start grid-cols-1 gap-4 px-12 pt-2 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grow shrink-0',
                      currentProvider &&
                        'pr-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                    )}
                  >
                    {xinxijiansuoList.map((collection) => (
                      <ProviderCard
                        active={currentProvider?.id === collection.id}
                        onSelect={() => setCurrentProvider(collection)}
                        key={collection.id}
                        collection={collection}
                        className={cn(
                          'relative overflow-hidden pb-2 group col-span-1 bg-white border-2 border-solid border-transparent rounded-lg shadow-sm flex flex-col transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg',
                          currentProvider?.id === collection.id &&
                            '!border-primary-400',
                          'bg-[linear-gradient(180deg,#EFF4FE_0%,#FFFFFF_100%)]',
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            {(activeTab === 'wenben' || activeTab === '') &&
              wenbenList.length > 0 && (
                <>
                  <div className="flex my-1 px-12">
                    <span className="font-bold text-[14px] text-[#495464] mr-4">
                      文本解析类
                    </span>
                    <div>
                      <span className="icon iconfont icon-reserved-fill text-[#FF9F69] mr-1"></span>
                      <span className="text-[#495464] text-[14px]">
                        共<span className="text-[#155EEF] mx-1">XX</span>
                        个工具集，合计
                        <span className="text-[#155EEF] mx-1">XX</span>
                        个工具
                      </span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'relative grid content-start grid-cols-1 gap-4 px-12 pt-2 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grow shrink-0',
                      currentProvider &&
                        'pr-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                    )}
                  >
                    {wenbenList.map((collection) => (
                      <ProviderCard
                        active={currentProvider?.id === collection.id}
                        onSelect={() => setCurrentProvider(collection)}
                        key={collection.id}
                        collection={collection}
                        className={cn(
                          'relative overflow-hidden pb-2 group col-span-1 bg-white border-2 border-solid border-transparent rounded-lg shadow-sm flex flex-col transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg',
                          currentProvider?.id === collection.id &&
                            '!border-primary-400',
                          'bg-[linear-gradient(180deg,#FFF5F0_0%,#FFFFFF_100%)] shadow-[0px_2px_4px_0px_rgba(217,219,232,0.51)]',
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            {(activeTab === 'wendangchuli' || activeTab === '') &&
              wendangchuliList.length > 0 && (
                <>
                  <div className="flex my-1 px-12">
                    <span className="font-bold text-[14px] text-[#495464] mr-4">
                      文档处理类
                    </span>
                    <div>
                      <span className="icon iconfont icon-reserved-fill text-[#FF9F69] mr-1"></span>
                      <span className="text-[#495464] text-[14px]">
                        共<span className="text-[#155EEF] mx-1">XX</span>
                        个工具集，合计
                        <span className="text-[#155EEF] mx-1">XX</span>
                        个工具
                      </span>
                    </div>
                  </div>
                  <div
                    className={cn(
                      'relative grid content-start grid-cols-1 gap-4 px-12 pt-2 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grow shrink-0',
                      currentProvider &&
                        'pr-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
                    )}
                  >
                    {wendangchuliList.map((collection) => (
                      <ProviderCard
                        active={currentProvider?.id === collection.id}
                        onSelect={() => setCurrentProvider(collection)}
                        key={collection.id}
                        collection={collection}
                        className={cn(
                          'relative overflow-hidden pb-2 group col-span-1 bg-white border-2 border-solid border-transparent rounded-lg shadow-sm flex flex-col transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg',
                          currentProvider?.id === collection.id &&
                            '!border-primary-400',
                          'bg-[linear-gradient(180deg,#CFF1E6_0%,#FFFFFF_100%)] shadow-[0px_2px_4px_0px_rgba(217,219,232,0.51)]',
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            { 
              !wendangchuliList.length&&!xinxijiansuoList.length&&!wenbenList.length&&<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'><Empty /></div>
            }
          </div>
          <div
            className={cn(
              'shrink-0 w-0 border-l-[0.5px] border-black/8 overflow-y-auto transition-all duration-200 ease-in-out bg-white',
              currentProvider && 'w-[420px]',
            )}
          >
            {currentProvider && (
              <ProviderDetail
                collection={currentProvider}
                onRefreshData={getDefaultToolsList}
              />
            )}
          </div>
          <div
            className="absolute top-5 right-5 p-1 cursor-pointer"
            onClick={() => setCurrentProvider(undefined)}
          >
            <RiCloseLine className="w-4 h-4" />
          </div>
        </div>
      )}
    </>
  )
}
DefaultToolsList.displayName = 'ToolDefaultToolsList'
export default DefaultToolsList
