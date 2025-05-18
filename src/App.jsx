import SearchBar from './components/SearchBar/index.js';
import ImageGallery from './components/ImageGallery/index.js';
import Loader from './components/Loader/index.js';
import { Toaster } from 'react-hot-toast';
import LoadMoreBtn from './components/LoadMoreBtn/index.js';
import ErrorMessage from './components/ErrorMessage';
import useApp from './hooks/useApp.js';
import ImageModal from './components/ImageModal/index.js';

function App() {
  const {
    onSubmit,
    error,
    images,
    pageInfo,
    loading,
    modalImage,
    modalIsOpen,
    closeModal,
    openModal,
    updateCurrentPage,
    currentPage,
  } = useApp();

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
