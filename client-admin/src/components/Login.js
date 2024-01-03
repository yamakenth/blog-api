import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Alert, Button } from "react-bootstrap";
import axios from "axios";

const TEST_USER_USERNAME = "user1";
const TEST_USER_PASSWORD = "user1";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleAccountPopulation() {
    setUsername(TEST_USER_USERNAME);
    setPassword(TEST_USER_PASSWORD);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      username,
      password,
    };

    axios.post(`/api/users/login`, user).then((res) => {
      console.log(res.data);
      if (res.data.message) {
        setError(res.data.message);
      } else {
        localStorage.setItem("token", "Bearer " + res.data.token);
        localStorage.setItem("username", res.data.user.username);
        setUsername("");
        setPassword("");
        navigate("/");
        window.location.reload();
      }
    });
  }

  function ErrorMessage() {
    if (error.length > 0) {
      return (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      );
    }
    return null;
  }

  return (
    <Form
      className="col-sm-4 offset-sm-4 d-flex flex-column"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        <Form.Label htmlFor="username">Username:</Form.Label>
        <Form.Control
          type="text"
          id="username"
          name="username"
          required
          value={username}
          onChange={handleUsernameChange}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control
          type="password"
          id="password"
          name="password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
      </Form.Group>
      <Button type="submit" variant="primary" className="mb-2">
        Submit
      </Button>
      <Button
        type="button"
        variant="secondary"
        onClick={handleAccountPopulation}
      >
        Populate with Test Admin Credentials
      </Button>
      <ErrorMessage />
    </Form>
  );
}

export default Login;
