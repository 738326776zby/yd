import { createContext } from 'use-context-selector'
import type { InstalledApp } from '@/models/ability-explore'
import type {
  NavItem,
  NavSection,
} from '@/app/components/ability-explore/sidebar/index.tsx'
type IExplore = {
  controlUpdateInstalledApps: number
  setControlUpdateInstalledApps: (controlUpdateInstalledApps: number) => void
  hasEditPermission: boolean
  installedApps: InstalledApp[]
  setInstalledApps: (installedApps: InstalledApp[]) => void
  setActiveTabItem: (item: NavSection & NavItem) => void
  activeTabItem: NavSection & NavItem
}

const ExploreContext = createContext<IExplore>({
  controlUpdateInstalledApps: 0,
  setControlUpdateInstalledApps: () => { },
  hasEditPermission: false,
  installedApps: [],
  // 记录当前页面 应用列表
  setInstalledApps: () => { },
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
