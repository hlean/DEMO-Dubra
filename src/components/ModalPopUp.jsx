import React from 'react'

const ModalPopUp = ({isOpen, children, onClose}) => {
  if (!isOpen) return null;
  
  return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-dubraWhite p-6 rounded-2xl shadow-lg relative max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-dubraPrimary"
          type='button'
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

export default ModalPopUp