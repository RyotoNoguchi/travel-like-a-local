'use client'

import { Popup } from '@/app/ui/components/molecules/popup/presenter'
import { useEffect, useRef, useState, type FC } from 'react'

export type ButtonConfig = {
  text: string
  variant?: 'primary' | 'secondary'
  onClick: () => void
}

type Props = {
  isOpen: boolean
  onClose: () => void
  message: string
  title?: string
  buttons?: ButtonConfig[]
}

export const PopupContainer: FC<Props> = ({ isOpen, onClose, message, title, buttons = [{ text: 'OK', onClick: () => {}, variant: 'primary' }] }) => {
  const [isVisible, setIsVisible] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // アニメーション効果のため、isOpenが変更されたら少し遅れてisVisibleを変更
    if (isOpen) {
      setIsVisible(true)
    } else {
      setTimeout(() => setIsVisible(false), 300)
    }
  }, [isOpen])

  useEffect(() => {
    // ポップアップ外クリックを検知する関数
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    // ESCキーでも閉じられるようにする
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    // イベントリスナーを追加
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscKey)
    }

    // クリーンアップ関数
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [isOpen, onClose])

  const handleButtonClick = (onClick: () => void) => {
    onClick()
    onClose()
  }

  if (!isVisible) return null

  return <Popup popupRef={popupRef} isOpen={isOpen} onClose={onClose} handleButtonClick={handleButtonClick} message={message} title={title} buttons={buttons} />
}
