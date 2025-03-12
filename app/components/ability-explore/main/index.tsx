'use client'
import React from 'react'
import AppList from '@/app/components/ability-explore/app-list'
import DefaultToolsList from '@/app/components/ability-explore/default-tools-list'
import ThirdPartyToolsList from '@/app/components/ability-explore/third-party-tools-list'
import CustomToolsList from '@/app/components/ability-explore/custom-tools-list'
import RecommendedList from '@/app/components/ability-explore/recommended-list'
import { useContext } from 'use-context-selector'
import ExploreContext from '@/context/explore-context'
const Main = () => {
  const { activeTabItem } = useContext(ExploreContext)
  return (
    <>
      { 
        activeTabItem.key === 'owned' && <AppList />
      }
      { 
        activeTabItem.key === 'defaultTools' &&  <DefaultToolsList />
      }
      { 
        activeTabItem.key === 'thirdPartyTools'  && <ThirdPartyToolsList />
      }
      { 
        activeTabItem.key === 'customTools' &&<CustomToolsList />
      }
      { 
        activeTabItem.key === 'recommended' && <RecommendedList/>
      }
     
    </>
  )
}

export default React.memo(Main)
