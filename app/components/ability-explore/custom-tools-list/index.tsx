'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useContext } from 'use-context-selector'
import ExploreContext from '@/context/explore-context'
import ToolProviderList from '@/app/components/tools/provider-list'


const List = () => {
  const { activeTabItem } = useContext(ExploreContext)
  return <ToolProviderList type={activeTabItem.key}/>
}

export default React.memo(List)
