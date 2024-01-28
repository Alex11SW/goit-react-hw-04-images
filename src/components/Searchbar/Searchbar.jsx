import { useEffect, useState } from "react";
import styles from "./searchbar.module.css";
import { searchPosts } from "../../api/posts";
import Button from "../Button/Button";
import PostsSearchForm from "./PostsSearchFrom/PostsSearchForm";
import ImageGallery from "../ImageGallery/ImageGallery";
import Modal from "../Modal/Modal";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [postDetails, setPostDetails] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await searchPosts(search, currentPage);

        const newPosts =
          currentPage === 1
            ? data?.hits || []
            : data?.hits.filter((post) => !posts.some((p) => p.id === post.id));

        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (search) {
      fetchPosts();
    }
  }, [search, currentPage]);

  const handleSearch = (searchQuery) => {
    setSearch(searchQuery);
    setCurrentPage(1);
    setPosts([]);
  };
  const handleImageClick = (webformatURL) => {
    setModalOpen(true);
    setPostDetails({
      webformatURL,
    });
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const isPost = Boolean(posts.length);
  const shouldRenderLoadMore =
    isPost && !loading && !error && posts.length % 12 === 0;

  return (
    <>
      <PostsSearchForm onSubmit={handleSearch} />
      {error && <p className={styles.error}>{error}</p>}
      {loading && <p>...Loading</p>}
      {isPost && <ImageGallery hits={posts} onImageClick={handleImageClick} />}
      {shouldRenderLoadMore && (
        <Button onClick={handleLoadMore} type="button">
          Load more
        </Button>
      )}
      {modalOpen && (
        <Modal onClose={handleCloseModal}>
          <img src={postDetails.webformatURL} alt="" />
        </Modal>
      )}
    </>
  );
};

export default Searchbar;
