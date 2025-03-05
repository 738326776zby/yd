import type { FC } from 'react'
import React from 'react'
import Main from '@/app/components/explore/installed-app'

export type LookDetailsProps = {
  params: {
    appId: string
  }
}

const LookDetails: FC<LookDetailsProps> = ({ params: { appId } }) => {
  return (
    <Main id={appId} />
  )
}
export default React.memo(LookDetails)
