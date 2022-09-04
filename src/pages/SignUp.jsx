import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import {
  Button, Form, Container, Row, Col, Card,
} from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import qs from 'qs';
import useAuth from '../hooks/useAuth.js';

const SignupPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();
  const [login, setAvailabilityLogin] = useState(false);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'От 3 до 15 символов')
        .max(15, 'От 3 до 15 символов')
        .required('Обязательное поле'),
      password: Yup.string()
        .min(6, 'Не менее 6 символов')
        .required('Обязательное поле'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
        .required('Обязательное поле'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post('http://79.143.31.216/register', null, {
          params: {
            username: values.username, password: values.password,
          },
        });
        const options = {
          method: 'POST',
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          data: qs.stringify(values),
          url: 'http://79.143.31.216/login',
        };
        const res = await axios(options);
        auth.logIn(res.data);
        navigate('/');
      } catch (error) {
        console.log(error);
        setAvailabilityLogin(true);
      }
    },
  });

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0" noValidate>
                <h1 className="text-center mb-4">Регистрация</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    onBlur={formik.handleBlur}
                    placeholder="username"
                    className="form-input"
                    name="username"
                    id="username"
                    autoComplete="username"
                    required
                    ref={inputRef}
                    isInvalid={login || (formik.touched.username && formik.errors.username)}
                  />
                  <Form.Label className="form-label" htmlFor="username">Имя</Form.Label>
                  {formik.touched.username && formik.errors.username ? (
                    <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <Form.Group className="form-floating mb-3">

                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    onBlur={formik.handleBlur}
                    placeholder="password"
                    name="password"
                    id="password"
                    isInvalid={login || (formik.touched.password && formik.errors.password)}
                    required
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  {formik.touched.password && formik.errors.password ? (
                    <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <Form.Group className="form-floating mb-3">

                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    placeholder="confirmPassword"
                    name="confirmPassword"
                    id="confirmPassword"
                    isInvalid={login
                             || (formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">Повторите пароль</Form.Label>

                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <Form.Control.Feedback tooltip type="invalid">
                      {formik.errors.confirmPassword}
                    </Form.Control.Feedback>
                  ) : null}
                  { login ? (
                    <Form.Control.Feedback tooltip type="invalid">
                      Уже есть регистрация, войдите в свой аккаунт
                    </Form.Control.Feedback>
                  ) : null}
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 btn btn-outline-primary">Зарегистрироваться</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <Link to="/signup">Войти в свой аккаунт</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;
