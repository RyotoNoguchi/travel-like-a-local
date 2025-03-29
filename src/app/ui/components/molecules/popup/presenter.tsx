import { CloseIcon } from '@/app/ui/components/atoms/icons/close-icon'
import type { ButtonConfig } from '@/app/ui/components/molecules/popup/container'
import { useTranslations } from 'next-intl'
import { type FC, type RefObject } from 'react'

type Props = {
  popupRef: RefObject<HTMLDivElement | null>
  isOpen: boolean
  message: string
  buttons: ButtonConfig[]
  title?: string
  handleButtonClick: (onClick: () => void) => void
  onClose: () => void
}

export const Popup: FC<Props> = ({ popupRef, isOpen, onClose, handleButtonClick, message, title, buttons }) => {
  const t = useTranslations()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div
        ref={popupRef}
        className={`w-[90%] max-w-md rounded-lg bg-white p-6 shadow-xl transition-all duration-300 dark:bg-gray-800 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label={t('Common.close')}
        >
          <CloseIcon width={24} height={24} />
        </button>

        <div className="mb-6 mt-2 text-center">
          {title !== undefined && <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{title}</h3>}
          <p className="text-base text-gray-700 dark:text-gray-300">{message}</p>
        </div>

        <div className="flex justify-center space-x-4">
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(button.onClick)}
              className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                button.variant === 'primary'
                  ? 'bg-primary text-white hover:opacity-90 dark:bg-primary dark:hover:opacity-80'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
