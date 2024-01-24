import React, { ReactElement, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  handleOffModal: () => void;
  toggledElementRef: React.RefObject<HTMLDivElement>;
  children: ReactElement;
}

const Modal: React.FC<Props> = ({
  handleOffModal,
  toggledElementRef,
  children,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <motion.div
      key="modal"
      className="fixed top-0 left-0 w-full h-full overflow-hidden backdrop-blur-md z-[999]"
      ref={toggledElementRef}
      onClick={handleOffModal}
      initial={{ y: 200 }}
      animate={{ y: 0 }}
      exit={{ y: 800 }}
    >
      <div className="p-0 items-end w-full md:p-6 h-full flex md:items-center justify-center overflow-hidden">
        <div
          id="content"
          ref={contentRef}
          onClick={stopPropagation}
          className="flex rounded-lg pb-[1rem] max-w-[82.6rem] w-full bg-accent_bg border flex-col md:rounded-md md:pb-[0]"
        >
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
