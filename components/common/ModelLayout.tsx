import React from "react";
import { IoClose } from "react-icons/io5";

const ModalLayout = ({
  isOpen,
  onClose,
  children,
  width = "max-w-6xl",
  height = "h-[90dvh]",
}: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white w-full ${width} ${height} overflow-auto p-8 rounded-lg shadow-lg relative`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-3xl top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <IoClose />
        </button>
        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
