'use client'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import cn from '@/utils/classnames'
export type NavItem = {
  title: string
  key: string
  icon: string
}
export type NavSection = {
  mainTitle: string
  list: NavItem[]
  desc: string
}
export type IExploreSideBarProps = {
  setActiveTabItem: (item: NavItem & NavSection) => void
}

const SideBar: FC<IExploreSideBarProps> = ({ setActiveTabItem }) => {
  // const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<string | null>('')
  const [navList, setNavList] = useState<NavSection[]>([
    {
      mainTitle: '数据与知识',
      desc: '基于元典自有的数据采集、治理、编辑、审核',
      list: [
        {
          title: '元典自有',
          key: 'owned',
          icon: '🏠',
        },
        {
          title: '第三方',
          key: 'thirdParty',
          icon: '日',
        },
      ],
    },
    {
      mainTitle: '工具',
      desc: '基于元典自有的数据采集、治理、编辑、审核',
      list: [
        {
          title: '元典工具',
          key: 'defaultTools',
          icon: '🏠',
        },
        {
          title: '第三方工具',
          key: 'thirdPartyTools',
          icon: '回',
        },
        {
          title: '自定义工具',
          key: 'customTools',
          icon: '⚙️',
        },
      ],
    },
    {
      mainTitle: '工作流应用',
      desc: '基于元典自有的数据采集、治理、编辑、审核',
      list: [
        {
          title: '元典推荐',
          key: 'recommended',
          icon: '💬',
        },
      ],
    },
  ])
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const getType = () => {
    const params = new URLSearchParams(searchParams)
    const type = params.get('type') || 'owned'
    setActiveTab(type)
    navList.forEach((navItem) => {
      navItem.list.forEach((item) => {
        if (item.key === type) {
          setActiveTabItem({
            ...item,
            ...navItem,
          })
        }
      })
    })
  }
  // 初始化获取参数
  useEffect(() => {
    getType()
  }, [])

  const sectionClick = (sectionItem: NavItem, section: NavSection) => {
    const key = sectionItem.key
    setActiveTab(key)
    setActiveTabItem({
      ...sectionItem,
      ...section,
    })
    router.push(`/ability-explore/apps?type=${key}`, { scroll: false })
  }
  return (
    <div className="flex flex-col w-[160px] bg-white shadow-[0px_2px_4px_0px_rgba(217,219,232,0.51)] rounded-lg poverflow-y-auto mt-6 ml-10 py-4 h-max-content">
      {navList.map((section, index) => (
        <div key={index} className="mb-4">
          {/* 分组标题 */}
          <div
            className="px-4  text-sm font-medium text-gray-500"
            style={{
              height: '22px',
              fontFamily: 'PingFangSC, PingFang SC',
              fontWeight: 500,
              fontSize: '14px',
              color: '#1D2939',
              lineHeight: '22px',
              textAlign: 'justify',
              fontStyle: 'normal',
            }}
          >
            {section.mainTitle}
          </div>
          {/* 分组列表项 */}
          <div className="mt-3">
            {section.list.map((sectionItem) => (
              <div
                key={sectionItem.key}
                className={cn(
                  {
                    active: activeTab === sectionItem.key,
                  },
                  'flex items-center py-2 text-sm cursor-pointer hover:bg-[#EBF0FF] text-gray-700 px-4 [&.active]:bg-[#EBF0FF] [&.active]:text-[#155EEF] [&.active]:font-normal [&.active]:text-[14px]',
                )}
                onClick={() => {
                  sectionClick(sectionItem, section)
                }}
              >
                {/* 图标 */}
                <span className="mr-2">{sectionItem.icon}</span>
                {/* 标题 */}
                <span>{sectionItem.title}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default React.memo(SideBar)
