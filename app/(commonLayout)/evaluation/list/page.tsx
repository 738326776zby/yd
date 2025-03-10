'use client'
import { useEffect, useMemo, useState } from 'react'
import {
  RiAddLine,
  RiMoreLine
} from '@remixicon/react'
import cn from '@/utils/classnames'
import type { EvaluationItem } from '@/models/evaluation'
import Input from '@/app/components/base/input'
import s from '@/app/components/tools/style.module.css'
import test from './test.json'
import AppIcon from '@/app/components/base/app-icon'
import { Dropdown, Button } from 'antd'
import './index.css'
import { QuestionCircleFilled, DashOutlined } from '@ant-design/icons';
import EvaluationPrincipleModal from '@/app/components/evaluation/evaluation-principle';
import NewEvaluationPrincipleModal from '@/app/components/evaluation/new-evaluation'

const DefaultToolsList = () => {
  const [chooseTarget, setChooseTarget] = useState<EvaluationItem | undefined>()
  const [allList, setAllList] = useState<EvaluationItem[]>([])
  const [keywords, setKeywords] = useState<string>('')
  const [open, setOpen] = useState(false)
  const [openNew, setOpenNew] = useState(false)
  const menuList = {
    items: [
      {
        label: <span onClick={()=>{
          setOpenNew(true)
        }} className='text-[#667085]'>编辑</span>,
        key: 'edit',
      },
      {
        label: <span onClick={()=>{
          setOpenNew(true)
        }} className='text-[#667085]'>下载</span>,
        key: 'download',

      },
      {
        label: <span onClick={()=>{
          setOpenNew(true)
        }} className='text-[#667085]'>删除</span>,
        key: 'delete',
      },
    ],
    onClick: () => {

    }
  }
  const handleKeywordsChange = (value: string) => {
    setKeywords(value)
  }
  const filterList = () => {
    return allList?.filter((collection) => {
      if (keywords) {
        return collection.title.toLowerCase().includes(keywords.toLowerCase())
      }
      return true
    })
  }
  const selectDropDown = (item: string) => {
    console.log(item)
  }

  const getDefaultToolsList = async () => {
    setAllList((test as EvaluationItem[]) || [])

  }
  useEffect(() => {
    getDefaultToolsList()
  }, [])

  return (
    <div className="flex h-full relative flex overflow-hidden bg-gray-100 shrink-0 h-0 grow">
      <div className="relative flex flex-col overflow-y-auto bg-gray-100 grow">
        <div
          className={cn(
            'sticky top-0 flex justify-between items-center pt-4 px-12  leading-[56px] bg-gray-100 z-20 flex-wrap gap-y-2 mb-4',
          )}
        >
          <div
            className={
              'mb-1 text-xl font-semibold items-center justify-between flex flex-1'
            }
          >
            <span className={s.textGradient}>
              评测方案管理
            </span>
            <div className="flex items-center gap-2">
              <Input
                showLeftIcon
                showClearIcon
                wrapperClassName="w-[200px]"
                value={keywords}
                onChange={(e) => handleKeywordsChange(e.target.value)}
                onClear={() => handleKeywordsChange('')}
                placeholder='搜索评测方案'
              />
              <Button type="link" icon={<QuestionCircleFilled />} onClick={() => {
                setOpen(true)
              }}>查看效果评测原理</Button>
            </div>
          </div>

        </div>
        <div
          className={cn(
            'relative grid content-start grid-cols-1 gap-4 px-12 pt-2 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grow shrink-0',
          )}
        >
          <div className='flex flex-col col-span-1 bg-gray-200 border-[0.5px] border-black/5 rounded-xl min-h-[160px] transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-50 hover:shadow-lg' onClick={() => {
            setOpenNew(true)
            setChooseTarget(undefined)
          }}>
            <div className='group grow rounded-t-xl hover:bg-white' >
              <div className='shrink-0 flex items-center p-4 pb-3'>
                <div className='w-10 h-10 flex items-center justify-center border border-gray-200 bg-gray-100 rounded-lg group-hover:border-primary-100 group-hover:bg-primary-50'>
                  <RiAddLine className='w-4 h-4 text-gray-500 group-hover:text-primary-600' />
                </div>
                <div className='ml-3 text-sm font-semibold leading-5 text-gray-800 group-hover:text-primary-600'>新建评测方案</div>
              </div>
            </div>
          </div>
          {filterList().map((collection) => (
            <div className={cn('group col-span-1 bg-white border-2 border-solid border-transparent rounded-xl shadow-sm min-h-[160px] flex flex-col transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg relative')} >
              <div className='flex pt-[14px] px-[14px] pb-3 h-[66px] items-center gap-3 grow-0 shrink-0'>
                <div className='relative shrink-0'>
                  {typeof collection.icon === 'string' && (
                    <div className='w-10 h-10 bg-center bg-cover bg-no-repeat rounded-md' style={{ backgroundImage: `url(${collection.icon})` }} />
                  )}
                  {typeof collection.icon !== 'string' && collection.icon && (
                    <AppIcon
                      size='large'
                      icon={collection.icon?.content}
                      background={collection?.icon.background}
                    />
                  )}
                </div>
                <div className='grow w-0 py-[1px]'>
                  <div className='flex items-center text-sm leading-5 font-semibold text-gray-800'>
                    <div className='truncate' title={collection.title}>{collection.title}</div>
                  </div>
                  <div className='flex items-center text-[10px] leading-[18px] text-gray-500 font-medium'>
                    <div className='truncate'>发布于&nbsp;{collection.publishTime}</div>
                  </div>
                </div>
              </div>
              <div
                className={cn(
                  'grow mb-2 px-[14px] max-h-[72px] text-xs leading-normal text-gray-500 line-clamp-4'
                )}
                title={collection.progress}
              >
                {collection.progress}
              </div>
              <div className='flex shrink-0 mt-1 pt-1 pl-[14px] pr-[6px] pb-[6px] h-[42px] justify-end'>
                <Dropdown menu={menuList} onOpenChange={(open)=>{
                    if(open){
                      setChooseTarget(collection)
                    }
                }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <RiMoreLine className='text-ms mr-1 text-gray-500 hover:text-[#155EEF]'/>
                  </a>
                </Dropdown>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EvaluationPrincipleModal open={open} setOpen={() => {
        setOpen(!open)
      }} />
      <NewEvaluationPrincipleModal open={openNew} setOpen={() => {
        setOpenNew(!openNew)
      }} target={chooseTarget} />
    </div>
  )
}
DefaultToolsList.displayName = 'List'
export default DefaultToolsList
