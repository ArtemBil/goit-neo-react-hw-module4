import React from 'react';
import ImageCard from '../ImageCard/index.js';

const ImageGallery = ({ images, openModal }) => {
  return (
    <ul>
      {images.map((image) => (
        <li key={image.id}>
          <ImageCard image={image} openModal={openModal}/>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
