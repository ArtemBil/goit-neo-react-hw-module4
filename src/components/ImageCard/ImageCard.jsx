import React from 'react';

const ImageCard = ({ image }) => {
  console.log(image);
  return (
    <div>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        width="432"
        height="286"
      />
    </div>
  );
};

export default ImageCard;
