import { createContext } from 'use-context-selector'
import type { Collection } from '@/models/ability-explore'
import type {
  NavItem,
  NavSection,
} from '@/app/components/ability-explore/sidebar'

type IExplore = {
  controlUpdateInstalledApps: number
  setControlUpdateInstalledApps: (controlUpdateInstalledApps: number) => void
  hasEditPermission: boolean

  setActiveTabItem: (item: NavSection & NavItem) => void
  activeTabItem: NavSection & NavItem
}

const ExploreContext = createContext<IExplore>({
  controlUpdateInstalledApps: 0,
  setControlUpdateInstalledApps: () => { },
  hasEditPermission: false,
  //记录选中 tab
  setActiveTabItem: () => { },
  activeTabItem: {
    title: '',
    mainTitle: '',
    list: [],
    desc: '',
    key: '',
    icon: '',
  },
})
export default ExploreContext
