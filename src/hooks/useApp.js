import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API_URL, UNSPLASH_PUBLIC_KEY } from '../utils/constants.js';

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common['Authorization'] = `Client-ID ${UNSPLASH_PUBLIC_KEY}`;

export default function useApp() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState({});

  const openModal = (image) => () => {
    setModalImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async ({ searchQuery }) => {
    setSearchQuery(searchQuery);
    setLoading(true);
    setError(false);

    toast.loading('Loading...', {
      id: 'images-loading',
    });
    try {
      const { data } = await axios.get(
        `search/photos?query=${searchQuery}&per_page=10&page=${currentPage}`,
      );

      setImages(data.results);
      setPageInfo({
        total: data.total,
        totalPages: data.total_pages,
      });
      toast.remove('images-loading');
    } catch (e) {
      console.error(e);
      toast.error('Something went wrong, please try again');
      setError(true);
    } finally {
      toast.remove('images-loading');
      setLoading(false);
    }
  };

  const updateCurrentPage = async () => {
    const { data } = await axios.get(
      `search/photos?query=${searchQuery}&per_page=10&page=${currentPage + 1}`,
    );

    setImages((prevState) => [...prevState, ...data.results]);
    setCurrentPage((prevState) => prevState + 1);
    toast.remove('images-loading');
  };

  return {
    images,
    currentPage,
    pageInfo,
    searchQuery,
    loading,
    error,
    openModal,
    closeModal,
    onSubmit,
    modalIsOpen,
    updateCurrentPage,
    modalImage,
  };
}
