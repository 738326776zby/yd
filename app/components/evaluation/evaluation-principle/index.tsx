'use client'
import React, { useState } from 'react'
import { Button, Modal } from 'antd';
type EvaluationPrincipleProps = {
  open?: boolean
  setOpen:()=>void
}
const EvaluationPrincipleModal = ({open,setOpen}:EvaluationPrincipleProps) => {

  return (
    <Modal
    title="查看效果评测原理"
    onCancel={()=>{
      setOpen()
    }}
    footer={
      <Button type="primary" onClick={()=>{
        setOpen()
      }}>
        确认
      </Button>
    }
    open={open}
  >
    <p className='w-[570px] h-[280px]'>Some contents...</p>
  
  </Modal>
  )
}

export default EvaluationPrincipleModal
