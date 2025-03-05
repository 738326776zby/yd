import React from 'react'
import AppList from '@/app/components/explore/app-list2'
import LookDetails from '@/app/components/explore/look-details'
import Main from '@/app/components/explore/installed-app'
const Apps = () => {
  return (
    <>
      {/* <AppList /> */}
      <LookDetails params={{ appId: "f374e424-643b-4a90-8ed3-7717edc649eb" }} />
    </>
  )
}

export default React.memo(Apps)
