import React, { useState } from "react";
import { Form, Card } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

function CommentCreate() {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const { id } = useParams();

  function handleAuthorChange(e) {
    setAuthor(e.target.value);
  }

  function handleTextChange(e) {
    setText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const comment = {
      author,
      text,
    };

    axios
      .post(`/api/articles/${id}/comments`, comment)
      .then((res) => {
        console.log(res);
        setAuthor("");
        setText("");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Card className="mb-2">
      <Card.Body className="py-2">
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="author">Display Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Anonymous Lizard"
              id="author"
              name="author"
              required
              value={author}
              onChange={handleAuthorChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="text">Comment:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Let us know your thoughts"
              name="text"
              required
              value={text}
              onChange={handleTextChange}
            />
          </Form.Group>
          <button type="submit" className="btn btn-primary align-self-end">
            Submit
          </button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CommentCreate;
