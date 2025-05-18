import React from 'react';

const ImageCard = ({ image, openModal }) => {
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        width="432"
        height="286"
        onClick={() => openModal(image)}
      />
    </div>
  );
};

export default ImageCard;
