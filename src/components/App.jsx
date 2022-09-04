import React from 'react';
import {
  Routes,
  Route,
  Link,
  BrowserRouter as Router,
} from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import SignupPage from '../pages/SignUp.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import MainPage from '../pages/MainPage.jsx';

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <Navbar bg="white" expand="lg" className="shadow-sm mb-5">
        <Container>
          <Navbar.Brand as={Link} to="/">Главная страница</Navbar.Brand>
          <Nav>
            <Nav.Link href="/login">Войти</Nav.Link>
            <Nav.Link href="/signup">
              Регистрация
            </Nav.Link>
          </Nav>
        </Container>

      </Navbar>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  </div>
);

export default App;
