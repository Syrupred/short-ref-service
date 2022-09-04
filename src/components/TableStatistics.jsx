/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth.js';

const TableStatistics = ({ shortLink }) => {
  const [statistics, updateStatistics] = useState([]);
  const [curPageSize, setCurPageSize] = useState(5);
  const [curPage, setCurPage] = useState(1);
  const [sortObj, setSortObj] = useState({
    short: '',
    target: '',
    counter: '',
  });
  const auth = useAuth();
  const navigate = useNavigate();
  const sortChange = (field, order) => {
    setSortObj({ ...sortObj, [field]: order });
  };
  const getParams = () => {
    const result = Object.entries(sortObj)
      .filter((arr) => arr[1] !== '')
      .map(([key, value]) => `${value}_${key}`);
    const resultOrder = result.reduce((acc, str) => {
      acc += `order=${str}&`;
      return acc;
    }, '').slice(0, -1);
    const resultStr = `offset=${curPage * (curPageSize - 1)}&limit=${curPageSize}&${resultOrder}`;
    return resultStr;
  };
  useEffect(() => {
    if (!auth.user) {
      navigate('/login');
    } else {
      const fetchContent = async () => {
        try {
          const { data } = await axios.get(`http://79.143.31.216/statistics?${getParams()}`, {
            headers: { Authorization: `Bearer ${auth.user?.access_token}` },
          });
          updateStatistics(data);
        } catch (error) {
          navigate('/login');
        }
      };

      fetchContent();
    }
  }, [shortLink, curPageSize, curPage, sortObj]);
  const columns = [
    {
      dataField: 'short',
      text: 'Короткая ссылка',
      sort: true,
      onSort: sortChange,
    }, {
      dataField: 'target',
      text: 'Исходная ссылка',
      style: {
        wordWrap: 'break-word',
        wordBreak: 'break-all',
      },
      sort: true,
      onSort: sortChange,
    }, {
      dataField: 'counter',
      text: 'Кол-во переходов по короткой ссылке',
      sort: true,
      onSort: sortChange,
    }];
  return (
    <BootstrapTable
      keyField="short"
      data={statistics}
      columns={columns}
      bootstrap4
      remote
      onTableChange={() => {

      }}
      pagination={paginationFactory({
        sizePerPage: curPageSize,
        page: curPage,
        alwaysShowAllBtns: true,
        totalSize: 100,
        onPageChange: (page) => {
          setCurPage(page);
        },
        onSizePerPageChange: (sizePage) => {
          setCurPageSize(sizePage);
        },
      })}
    />
  );
};

export default TableStatistics;
