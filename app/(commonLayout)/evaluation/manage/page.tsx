'use client'
import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import { QuestionCircleFilled,DownloadOutlined } from '@ant-design/icons';
import EvaluationPrincipleModal from '@/app/components/evaluation/evaluation-principle';
import { useRouter } from 'next/navigation'
import type { EvaluationItem } from '@/models/evaluation'
import AppIcon from '@/app/components/base/app-icon'

const AppList = () => {
  const [chooseTarget, setChooseTarget] = useState<EvaluationItem | undefined>(
    {
      title:'评测集名称',
      icon:'',
      publishTime:'2024-10-1'
    }
  )
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className='relative flex justify-center overflow-y-auto bg-background-body shrink-0 h-0 grow  gap-4'>
<div className='w-[336px] bg-white flex border-r-3'>
        <div className='flex flex-1 pt-[14px] px-[14px] pb-4 border-b border-dashed border-[#E1E3E7]'>
          <div className='relative w-10 h-10'>
            {typeof chooseTarget?.icon === 'string' && (
              <div className='w-10 h-10 bg-center bg-cover bg-no-repeat rounded-md' style={{ backgroundImage: `url(${chooseTarget?.icon})` }} />
            )}
            {typeof chooseTarget?.icon !== 'string' && chooseTarget?.icon && (
              <AppIcon
                size='large'
                icon={chooseTarget.icon?.content}
                background={chooseTarget?.icon.background}
              />
            )}
          </div>
          <div className='grow  py-[1px] flex-1'>
            <div className='flex items-center text-sm leading-5 font-semibold text-gray-800 justify-between'>
              <div className='truncate' title={chooseTarget?.title}>{chooseTarget?.title}</div>
              <Button type="link" icon={<DownloadOutlined/>} className='text-[12px]'>下载</Button>
            </div>
            <div className='flex items-center text-[10px] leading-[18px] text-gray-500 font-medium'>
              <div className='truncate'>发布于&nbsp;{chooseTarget?.publishTime}</div>
            </div>
          </div>
      
        </div>
      </div>
      <div className='flex-1 bg-white flex border-r-3'>

      </div>

    </div >
  )
}

export default AppList
