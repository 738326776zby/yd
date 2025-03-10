import React from 'react'
import AppList from '@/app/components/ability-explore/app-list'
import DefaultToolsList from '@/app/components/ability-explore/default-tools-list'
import ThirdPartyToolsList from '@/app/components/ability-explore/third-party-tools-list'
import CustomToolsList from '@/app/components/ability-explore/custom-tools-list'
import RecommendedList from '@/app/components/ability-explore/recommended-list'
const Apps = () => {
  return (
    <>
      <AppList />
      <DefaultToolsList />
      <ThirdPartyToolsList />
      <CustomToolsList />
      <RecommendedList/>
    </>
  )
}

export default React.memo(Apps)
