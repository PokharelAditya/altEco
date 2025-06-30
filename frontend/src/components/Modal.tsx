import type { ReactNode } from 'react'
import { X } from 'lucide-react'

type ModalProps = {
    isOpen:boolean,
    onClose: () => void,
    title:string,
    children:ReactNode
  }

const Modal = ({ isOpen, onClose, title, children}:ModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-gray-100">{title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 cursor-pointer hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    )
  }

export default Modal
