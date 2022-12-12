import { query, collection, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../Firebase';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState, useMemo } from 'react';
import { renderToString } from 'react-dom/server';
import jsPDF from 'jspdf';
import { useTable, useBlockLayout } from 'react-table';

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    state,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },

    useBlockLayout
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export const ShowData = () => {
  const [posts, setPosts] = useState([]);
  const [tableData, setTableData] = useState([]);
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const q = query(collection(db, 'posts'), orderBy('token'));

  const readFunction = async () => {
    const querySnapshot = await getDocs(q);
    let feed = [];
    querySnapshot.forEach((doc) => {
      feed.push({
        ...doc.data(),
        key: doc.id,
      });
    });
    setPosts(feed);
    setTableData(feed);
  };

  useEffect(() => {
    readFunction();
  }, []);
  //pdf

  function PrintAllTokens() {
    const PrintsData = posts.map((post, index) => (
      <tr>
        <td>{post.token}</td>
        <td>{post.name}</td>
        <td>{post.number}</td>
      </tr>
    ));
    return (
      <table>
        <tr>
          <th>Token</th>
          <th>Name</th>
          <th>Number</th>
        </tr>
        {PrintsData}
      </table>
    );
  }
  function PrintByName() {
    const groupByName = posts.reduce((group, post) => {
      const { name } = post;
      group[name] = group[name] ?? [];
      group[name].push(post);
      return group;
    }, {});

    const PrintsData = Object.keys(groupByName).map((post, index) => {
      return (
        <div>
          entry {index + 1}. {post}
          {groupByName[post].map((entry) => {
            return (
              <li>
                {entry.number} - {entry.token}
              </li>
            );
          })}
        </div>
      );
    });
    return PrintsData;
  }

  const print = (byName) => {
    const string = renderToString(
      byName ? <PrintByName /> : <PrintAllTokens />
    );
    const pdf = new jsPDF();
    pdf.fromHTML(string);
    pdf.save('document');
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Token',
        accessor: 'token',

        Cell: ({ value }) => {
          return <span>{value}</span>;
        },
      },
      {
        Header: 'Name',
        accessor: 'name',

        Cell: ({ value }) => {
          return <span>{value}</span>;
        },
      },
      {
        Header: 'Number',
        accessor: 'number',

        Cell: ({ value }) => {
          return <span>{value}</span>;
        },
      },
      {
        Header: 'Date',
        accessor: 'date',

        Cell: ({ value }) => {
          const date = new Date(value);
          return (
            date.getDate() +
            '/' +
            (date.getMonth() + 1) +
            '/' +
            date.getFullYear()
          );
        },
      },
    ],

    [tableData]
  );
  const data = useMemo(() => tableData, [tableData]);
  const filterData = () => {
    const newData = [];
    posts.forEach((post) => {
      let postDate = new Date(post.date);

      if (
        postDate.getTime() >= startDate.getTime() &&
        postDate.getTime() <= endDate.getTime() + 86400000
      ) {
        newData.push(post);
      }
    });

    setTableData(newData);
  };
  return (
    <div className="home" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <label>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <label>End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
          />
        </div>
        <button onClick={() => filterData()}>filter Data</button>
      </div>
      <div className="table">
        {posts.length > 0 ? <Table columns={columns} data={data} /> : null}
      </div>
      <button onClick={() => print(false)}>print all tokens</button>
      <button onClick={() => print(true)}>print by name</button>
    </div>
  );
};
