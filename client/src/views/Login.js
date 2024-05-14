import React, { useState, useContext } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from 'reactstrap';
import axios from 'axios';
import AuthContext from '../contexts/AuthContext'; // Ensure correct path to AuthContext
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      console.log("Attempting login with:", username, password);
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      console.log("Login response:", response.data);
  
      localStorage.setItem('token', response.data.token); // Store the token in local storage
      console.log("Token stored in localStorage:", response.data.token);  // Confirm token storage
  
      login(); // Call the `login` function from AuthContext to update authentication state
      console.log("Authentication status set to true");
  
      navigate('/admin/index'); // Navigate to the admin dashboard after successful login
      console.log("Navigation to /admin/index triggered");
    } catch (error) {
      console.error("Login failed with error:", error);
      alert('Invalid credentials'); // Adjust message based on the error
    }
  };
  

  return (
    <Col lg="5" md="7">
      <Card className="bg-secondary shadow border-0">
        <CardHeader className="bg-transparent pb-5">
          <div className="text-muted text-center mt-2 mb-3"><small>Sign in with credentials</small></div>
        </CardHeader>
        <CardBody className="px-lg-5 py-lg-5">
          <Form role="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <FormGroup className="mb-3">
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-email-83" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Username"
                  type="text"
                  autoComplete="new-username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <InputGroup className="input-group-alternative">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="ni ni-lock-circle-open" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormGroup>
            <div className="text-center">
              <Button className="my-4" color="primary" type="submit">
                Sign in
              </Button>
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Login;
