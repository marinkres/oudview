import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <div className="flex justify-between">
          <h2 className="text-xl font-medium">Modal Header</h2>
          <button onClick={onClose} className="text-lg">×</button>
        </div>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export const ModalHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xl font-medium">{children}</div>
);

export const ModalBody = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-4">{children}</div>
);

export const ModalFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-6 flex justify-end space-x-2">{children}</div>
);

export const ModalCloseButton = ({ onClick }: { onClick: () => void }) => (
  <button onClick={onClick} className="text-lg">×</button>
);
