// frontend/src/components/Modal.jsx

import { FaTimes } from "react-icons/fa";

function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
      {}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 z-50">
        {}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={20} />
          </button>
        </div>
        {}
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
