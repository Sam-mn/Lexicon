import { FormEventHandler, ReactElement, useState } from "react";
import { useAuth } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import "../css/LoginPage.css";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import logo from "../../public/images/logo-lexicon.gif";

export function LoginPage(): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(username, password);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  // return (
  //   <div className="login-container">
  //     <form className="login-form" onSubmit={handleOnSubmit}>
  //       <h1>Welcome Back</h1>
  //       <div className="input-group">
  //         <label htmlFor="username">Username</label>
  //         <input
  //           id="username"
  //           onChange={(e) => setUsername(e.target.value)}
  //           type="text"
  //           value={username}
  //           required
  //           autoFocus
  //         />
  //       </div>
  //       <div className="input-group">
  //         <label htmlFor="password">Password</label>
  //         <input
  //           id="password"
  //           onChange={(e) => setPassword(e.target.value)}
  //           type="password"
  //           value={password}
  //           required
  //         />
  //       </div>
  //       {error && <div className="error-message">{error}</div>}
  //       <button type="submit" disabled={isLoading}>
  //         {isLoading ? 'Logging in...' : 'Log In'}
  //       </button>
  //     </form>
  //   </div>
  // );
  return (
    <div className="w-100">
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={4}>
          <img src={logo} className="login-logo" />
          <h2 className="text-center mt-4">Log in to your account</h2>
          <h5 className="text-center mb-5 opacity-50">
            Welcome back! Please enter your details
          </h5>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
            {error && <div className="error-message">{error}</div>}
          </Form>
        </Col>
      </Row>
    </div>
  );
}
