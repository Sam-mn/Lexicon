import { FormEventHandler, ReactElement, useState } from 'react';
import { useAuth } from '../hooks';
import { Navigate, useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { IUser } from '../utils';

export function LoginPage(): ReactElement {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const userData: IUser | undefined = await login(username, password);
      if (userData?.UserRole === 'student') {
        navigate(`/courses/${userData.courseId}`);
      } else if (userData?.UserRole === 'teacher') {
        navigate('/');
      }
      if (userData === undefined) {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="login-container">
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className="login-form-wrapper">
            <h1 className="login-title">LMS</h1>
            <h2 className="text-center mb-4">Log in to your account</h2>
            <Form onSubmit={handleOnSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </Button>
              {error && <div className="error-message mt-3">{error}</div>}
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
