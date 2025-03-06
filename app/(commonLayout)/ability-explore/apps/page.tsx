import React from 'react'
import AppList from '@/app/components/ability-explore/app-list'
import DefaultToolsList from '@/app/components/ability-explore/default-tools-list'


const Apps = () => {
  return (
    <>
      <AppList />
      <DefaultToolsList/>
    </>
  )
}

export default React.memo(Apps)
