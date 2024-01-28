import { useEffect, useState, useRef } from "react";

import styles from "./posts-search-form.module.css";

const PostsSearchForm = ({ onSubmit }) => {
  const [state, setState] = useState({
    search: "",
  });

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      [name]: value.toLowerCase(),
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...state.search });
    setState({
      search: "",
    });
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <button type="submit" className={styles.SearchFormbutton}>
          <span className={styles["button-label"]}>Search</span>
        </button>

        <input
          ref={inputRef}
          name="search"
          value={state.search}
          onChange={handleChange}
          className={styles.SearchForminput}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};

export default PostsSearchForm;
