/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import {
  Container, Button, Form, Row, Col,
} from 'react-bootstrap';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { useFormik } from 'formik';
import { useClipboard } from 'use-clipboard-copy';
import useAuth from '../hooks/useAuth.js';
import TableStatistics from '../components/TableStatistics.jsx';

const MainPage = () => {
  const auth = useAuth();
  const inputRef = useRef();
  const [shortLink, setShortLink] = useState(null);
  const clipboard = useClipboard();
  useEffect(() => {
    inputRef?.current?.focus();
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post('http://79.143.31.216/squeeze', null, {
          headers: { Authorization: `Bearer ${auth.user?.access_token}` },
          params: {
            link: values.body,
          },
        });
        setShortLink(res.data.short);
        values.body = '';
      } catch (error) {
        console.log(error);
      }
    },
  });

  const copyToClip = (link) => () => {
    clipboard.copy(`http://79.143.31.216/s/${link}`);
  };

  return auth.user ? (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={10}>
          <div className="mt-auto px-5 py-3">
            <Form onSubmit={formik.handleSubmit} noValidate className="py-2 border rounded-2  mb-4">
              <Form.Group className="input-group has-validation">

                <Form.Control
                  onChange={formik.handleChange}
                  className="border-0 p-0 ps-2 form-control"
                  aria-label="Новое сообщение"
                  placeholder="Введите ссылку"
                  name="body"
                  id="body"
                  required
                  value={formik.values.body}
                  autoFocus
                  ref={inputRef}
                />
                <Button
                  variant="white"
                  disabled={formik.values.body === ''}
                  type="submit"
                  className="btn-group-vertical"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                  </svg>
                  <span className="visually-hidden">Отправить</span>
                </Button>

              </Form.Group>
            </Form>
          </div>
          {shortLink && (
          <div className="mb-2">
            Ваша короткая ссылка:
            {' '}
            <Button onClick={copyToClip(shortLink)} variant="outline-secondary" id="button-addon1">
              {shortLink}
            </Button>

            <br />
            Кликнете на нее, чтобы поместить в буфер обмена
          </div>
          )}
          <TableStatistics shortLink={shortLink} />
        </Col>
      </Row>
    </Container>
  ) : null;
};

export default MainPage;
