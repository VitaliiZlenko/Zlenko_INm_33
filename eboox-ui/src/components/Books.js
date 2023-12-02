import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Typography,
} from '@mui/material';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');

  const fetchBooks = () => {
    axios
      .get('/book/all')
      .then((response) => setBooks(response.data))
      .catch((error) => console.error('Error fetching data:', error));
  };

  useEffect(() => {
    fetchBooks();

    const intervalId = setInterval(() => {
      fetchBooks();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleDelete = (bookId) => {
    axios
      .post(`/book/delete/${bookId}`)
      .then(() => {
        setBooks(books.filter((book) => book.id !== bookId));
      })
      .catch((error) => {
        alert('Error deleting book:', error);
      });
  };

  const handleSave = () => {
    const newBook = {
      author,
      title,
      genre,
    };

    axios
      .post('/book/add', newBook)
      .then((response) => {
        setBooks([...books, response.data]);
        setAuthor('');
        setTitle('');
        setGenre('');
      })
      .catch((error) => {
        alert('Error saving book:', error);
      });
  };

  return (
    <div>
      <Typography variant="h4">Book List</Typography>
      <TableContainer component={Paper} style={{ width: '80%', margin: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Author</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Genre</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id}>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleDelete(book.id)}
                    color="secondary"  
                    style={{ marginRight: '8px' }}  
                  >
                    Delete
                  </Button>
                  <Button
                    component={Link}
                    to={`/update/${book.id}`}
                    variant="outlined"
                    color="primary"  
                  >
                    Modify
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" mt={2}>
        Add New Book
      </Typography>
      <div>
        <TextField label="Author" variant="outlined" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <TextField label="Title" variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField label="Genre" variant="outlined" value={genre} onChange={(e) => setGenre(e.target.value)} />
      </div>
      <Button variant="" onClick={handleSave} color="primary">Save</Button>
    </div>
  );
};

export default BookList;
