'use client'
import { useUnit } from 'effector-react'
import { Toaster } from 'react-hot-toast'
import { usePathname, useRouter } from 'next/navigation'
import { $showQuickViewModal, $showSizeTable, closeQuickViewModal } from '@/context/modals'
import Layout from './Layout'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { closeSizeTableByCheck, removeOverflowHiddenFromBody } from '@/lib/utils/common'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const showQuickViewModal = useUnit($showQuickViewModal)
  const showSizeTable = useUnit($showSizeTable)

  const handleCloseQuickViewModal = () => {
    removeOverflowHiddenFromBody()
    closeQuickViewModal()
  }

  const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

  return (
    <html lang='en'>
      <body>
        <Layout>{children}</Layout>
        <div
          className={`quick-view-modal-overlay ${showQuickViewModal ? 'overlay-active' : ''}`}
          onClick={handleCloseQuickViewModal}
        />
        <div
          className={`quick-view-modal-overlay ${showSizeTable ? 'overlay-active' : ''}`}
          onClick={handleCloseSizeTable}
        />
      </body>
    </html>
  )
}

export default PagesLayout
