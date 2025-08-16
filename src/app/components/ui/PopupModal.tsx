// components/ui/tournamnetModal.tsx
"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 ">
      <div
        className={`bg-white rounded-xl shadow-lg  p-6 overflow-auto relative  w-[800px]`}
      >
        <span
          className="material-symbols-outlined cursor-pointer absolute top-4 right-4 text-gray-600 hover:text-red-600 text-xl"
          style={{ fontSize: "32px" }}
          onClick={onClose}
        >
          close
        </span>
        {children}
      </div>
    </div>
  );
}
