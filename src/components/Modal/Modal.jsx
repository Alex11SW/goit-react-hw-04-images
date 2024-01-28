import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.css";

const modalRoot = document.getElementById("modal-root");

const Modal = ({ onClose, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    return () => {
      setIsOpen(false);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const modalElement = document.createElement("div");
      modalRoot.appendChild(modalElement);
      return () => {
        modalRoot.removeChild(modalElement);
      };
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };
  const handleOverlayClick = (event) => {
    if (!event.target.closest(`.${styles.modal}`)) {
      handleClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <span className={styles.close} onClick={handleClose}>
          X
        </span>
        <div className={styles["image-container"]}>{children}</div>
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
