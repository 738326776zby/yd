'use client'
import cn from '@/utils/classnames'
import type { App } from '@/models/explore'
import AppIcon from '@/app/components/base/app-icon'
import { getLanguage } from '@/i18n/language'
import { useContext } from 'use-context-selector'
import type { Collection } from '@/models/ability-explore'
import I18n from '@/context/i18n'

export type AppCardProps = {
  collection: Collection
  onSelect?: () => void
  active?: boolean
}

const AppCard = ({ onSelect, collection,active }: AppCardProps) => {
  const { locale } = useContext(I18n)
  const language = getLanguage(locale)
  return (
    <div
      className={cn(
        'relative overflow-hidden pb-2 group col-span-1 bg-white border-2 border-solid border-transparent rounded-lg shadow-sm flex flex-col transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg',
        active && '!border-primary-400'
      )}
      onClick={onSelect}
    >
      <div className="flex pt-[14px] px-[14px] pb-3 h-[66px] items-center gap-3 grow-0 shrink-0">
        <div className="relative shrink-0">
          {typeof collection.icon === 'string' && (
            <div className='w-10 h-10 bg-center bg-cover bg-no-repeat rounded-md' style={{ backgroundImage: `url(${collection.icon})` }} />
          )}
          {typeof collection.icon !== 'string' && (
            <AppIcon
              size='large'
              icon={collection.icon.content}
              background={collection.icon.background}
            />
          )}
        </div>
        <div className="grow w-0 py-[1px]">
          <div className="flex items-center text-sm leading-5 font-semibold text-text-secondary">
            <div className='truncate' title={collection.label[language]}>{collection.label[language]}</div>
          </div>
        </div>
      </div>
      <div className="description-wrapper h-[90px] px-[14px] text-xs leading-normal text-text-tertiary ">
        <div className="line-clamp-4 group-hover:line-clamp-2">
          {collection.description[language]}
        </div>
      </div>
    </div>
  )
}

export default AppCard
