import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StyledDiv = {
  padding: '20px',
  marginBottom: '10px',
};

const Edit = ({ bookId }) => {
  const [book, setBook] = useState({});
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`/book/${bookId}`);
        const { data } = response;
        setBook(data);
        setAuthor(data.author);
        setTitle(data.title);
        setGenre(data.genre);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBookData();
  }, [bookId]);

  const handleUpdate = () => {
    const updatedBook = {
      ...book,
      author,
      title,
      genre,
    };

    axios.post(`/book/update/${bookId}`, updatedBook);
  };

  return (
    <div style={StyledDiv}>
      <h1>Edit Book</h1>
      <div style={StyledDiv}>
        <label>Author:</label>
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div style={StyledDiv}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div style={StyledDiv}>
        <label>Genre:</label>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </div>
      <button onClick={handleUpdate} style={{ marginTop: '10px', padding: '10px' }}>
        Update
      </button>
      <a href="/">Back</a>
    </div>
  );
};

export default Edit;