import SearchBar from './components/SearchBar/index.js';
import ImageGallery from './components/ImageGallery/index.js';
import Loader from './components/Loader/index.js';
import toast, { Toaster } from 'react-hot-toast';
import LoadMoreBtn from './components/LoadMoreBtn/index.js';
import ErrorMessage from './components/ErrorMessage';
import ImageModal from './components/ImageModal/index.js';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState({});

  const openModal = (image) => {
    setModalImage(image);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = async ({ searchQuery }) => {
    if (searchQuery.trim() === '') {
      return toast.error('Please enter a search query');
    }

    setSearchQuery(searchQuery);
  };

  const updateCurrentPage = async () => {
    setCurrentPage((prevState) => prevState + 1);
    toast.remove('images-loading');
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    
    const fetchImages = async () => {
      setLoading(true);
      setError(false);

      toast.loading('Loading...', {
        id: 'images-loading',
      });
      try {
        const { data } = await axios.get(
          `search/photos?query=${searchQuery}&per_page=10&page=${currentPage}`,
        );

        if (!data.results.length) {
          return toast.error('No images found');
        }

        setImages((prevState) => [...prevState, ...data.results]);
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

    fetchImages();
  }, [searchQuery, currentPage]);

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {!error && images.length ? (
        <ImageGallery images={images} openModal={openModal} />
      ) : null}
      {!error && currentPage < pageInfo.totalPages ? (
        <LoadMoreBtn updatePage={updateCurrentPage} />
      ) : null}
      {loading ? <Loader /> : null}
      {error ? <ErrorMessage /> : null}
      <Toaster />
      {!error && Object.keys(modalImage).length ? (
        <ImageModal
          closeModal={closeModal}
          modalImage={modalImage}
          modalIsOpen={modalIsOpen}
        />
      ) : null}
    </div>
  );
}

export default App;
