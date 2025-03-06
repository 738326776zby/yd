'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useContext } from 'use-context-selector'
import ExploreContext from '@/context/explore-context'
import ToolProviderList from '@/app/components/tools/provider-list'


const Apps = () => {
  const { activeTabItem } = useContext(ExploreContext)
  return activeTabItem.key === 'owned' ? (
    <ToolProviderList type={activeTabItem.key}/>
  )
    : null
}

export default React.memo(Apps)
