import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '800px',
    background: 'transparent',
    borderRadius: '0',
    padding: '',
    border: 'none',
  },
};

const ImageModal = ({ modalIsOpen, closeModal, modalImage }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
    >
      <img
        className="modal-image"
        src={modalImage.urls.regular}
        alt={modalImage.alt_description}
      />
    </Modal>
  );
};

export default ImageModal;
