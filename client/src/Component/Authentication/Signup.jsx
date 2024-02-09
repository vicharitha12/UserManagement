import React, { useState } from "react";
import { Form, Button, Spinner, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PostSignup } from "../Axios/apis";
const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      input.email &&
      input.password &&
      input.name &&
      input.cpassword === input.password
    ) {
      setLoading(true);
      try {
        let formdata = {
          username: input.name,
          password: input.password,
          email: input.email,
          age: input.age,
          dob: input.dob,
          contact: input.contact,
        };
        await PostSignup(formdata);
        alert("account created successfully");
        navigate("/");
      } catch (error) {
        const { response } = error;
        alert(response?.data);
        setLoading(false);
      }
    } else {
      alert("error in sign up fields");
      setLoading(false);
    }
  };
  return (
    <div className="signin-main">
      <Form className="signin-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            required
            value={input.name}
            onChange={(e) => setInput({ ...input, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Date of Birth"
              value={input.dob}
              onChange={(e) => setInput({ ...input, dob: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Age"
              required
              value={input.age}
              onChange={(e) => setInput({ ...input, age: e.target.value })}
            />
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter contact number"
            required
            value={input.contact}
            onChange={(e) => setInput({ ...input, contact: e.target.value })}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} md={6}>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={input.cpassword}
              onChange={(e) =>
                setInput({ ...input, cpassword: e.target.value })
              }
            />
          </Form.Group>
        </Row>
        <Form.Group className="submit-btn">
          <Button
            variant="success"
            type="submit"
            disabled={loading ? true : false}
          >
            {loading ? <Spinner animation="border" /> : "Sign Up"}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Signup;
