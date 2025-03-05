/*
 * @Author: zhangboya3 zhangboya3@xiaomi.com
 * @Date: 2025-03-05 15:42:20
 * @LastEditors: zhangboya3 zhangboya3@xiaomi.com
 * @LastEditTime: 2025-03-05 18:59:27
 * @FilePath: /yd/app/components/ability-explore/app-card/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
'use client'
import cn from '@/utils/classnames'
import type { App } from '@/models/explore'
import AppIcon from '@/app/components/base/app-icon'
import {
  AiText,
  ChatBot,
  CuteRobot,
} from '@/app/components/base/icons/src/vender/solid/communication'
import { Route } from '@/app/components/base/icons/src/vender/solid/mapsAndTravel'
import Button from '@/app/components/base/button'
import { useRouter } from 'next/navigation'
import ExploreContext from '@/context/explore-context'
import { useContext } from 'use-context-selector'
export type AppCardProps = {
  app: App
}

const AppCard = ({ app }: AppCardProps) => {
  const { app: appBasicInfo } = app
  const router = useRouter()
  const { activeTabItem, setInstalledApps, installedApps } = useContext(ExploreContext)
  const url = `/ability-explore/installed/a0ba1b0e-d0ee-40d4-941c-0372d6ba7fdb?type=${activeTabItem.key}`
  const lookDetails = () => {
    router.push(url)
  }
  return (
    <div
      className={cn(
        'relative overflow-hidden pb-2 group col-span-1 bg-white border-2 border-solid border-transparent rounded-lg shadow-sm flex flex-col transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg',
      )}
    >
      <div className="flex pt-[14px] px-[14px] pb-3 h-[66px] items-center gap-3 grow-0 shrink-0">
        <div className="relative shrink-0">
          <AppIcon
            size="large"
            iconType={appBasicInfo.icon_type}
            icon={appBasicInfo.icon}
            background={appBasicInfo.icon_background}
            imageUrl={appBasicInfo.icon_url}
          />
          <span className="absolute bottom-[-3px] right-[-3px] w-4 h-4 p-0.5 bg-white rounded border-[0.5px] border-[rgba(0,0,0,0.02)] shadow-sm">
            {appBasicInfo.mode === 'advanced-chat' && (
              <ChatBot className="w-3 h-3 text-[#1570EF]" />
            )}
            {appBasicInfo.mode === 'agent-chat' && (
              <CuteRobot className="w-3 h-3 text-indigo-600" />
            )}
            {appBasicInfo.mode === 'chat' && (
              <ChatBot className="w-3 h-3 text-[#1570EF]" />
            )}
            {appBasicInfo.mode === 'completion' && (
              <AiText className="w-3 h-3 text-[#0E9384]" />
            )}
            {appBasicInfo.mode === 'workflow' && (
              <Route className="w-3 h-3 text-[#f79009]" />
            )}
          </span>
        </div>
        <div className="grow w-0 py-[1px]">
          <div className="flex items-center text-sm leading-5 font-semibold text-text-secondary">
            <div className="truncate" title={appBasicInfo.name}>
              {appBasicInfo.name}
            </div>
          </div>
        </div>
      </div>
      <div className="description-wrapper h-[90px] px-[14px] text-xs leading-normal text-text-tertiary ">
        <div className="line-clamp-4 group-hover:line-clamp-2">
          {app.description}
        </div>
      </div>
      <div
        className={cn(
          ' items-center flex-wrap min-h-[42px] px-[14px] pt-2 pb-[10px] bg-white group-hover:flex absolute bottom-0 left-0 right-0',
        )}
      >
        <div className={cn('flex items-center w-full space-x-2')}>
          <Button
            className="text-sm w-[104px] h-[24px] bg-[#155EEF] rounded-[12px] text-xs"
            variant="primary"
            onClick={lookDetails}
          >
            查看数据详情
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AppCard
