import React from 'react';

import { Tooltip } from 'antd';

const columns = [
  {
    title: 'Section.1',
    dataIndex: ['part', 'section1'],
    sorter: {
      compare: (a, b) => a.part.section1.localeCompare(b.part.section1),
      multiple: 1,
    },
    width: 80,
    responsive: ['md'],
  },
  {
    title: 'Section.2',
    dataIndex: ['part', 'section2'],
    sorter: {
      compare: (a, b) => a.part.section2.localeCompare(b.part.section2),
      multiple: 1,
    },
    width: 110,
    responsive: ['md'],
  },
  {
    title: 'Name',
    dataIndex: ['part', 'name'],
    sorter: {
      compare: (a, b) => a.part.name.localeCompare(b.part.name),
      multiple: 2,
    },
    onCell: () => {
      return {
        style: {
          whiteSpace: 'nowrap',
          maxWidth: 200,
          minWidth: 50,
        },
      };
    },
    render: text => (
      <Tooltip title={text}>
        <div style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {text}
        </div>
      </Tooltip>
    ),
  },
  {
    title: '설명',
    dataIndex: ['part', 'desc'],
    sorter: {
      compare: (a, b) => a.part.desc.localeCompare(b.part.desc),
      multiple: 3,
    },
    responsive: ['xl'],
  },
  {
    title: '재고',
    dataIndex: 'stock',
    sorter: {
      compare: (a, b) => a.stock - b.stock,
      multiple: 4,
    },
    showSorterTooltip: false,
    width: 90,
    responsive: ['sm'],
    render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
  {
    title: '가격',
    dataIndex: ['part', 'price'],
    sorter: {
      compare: (a, b) => a.part.price - b.part.price,
      multiple: 4,
    },
    showSorterTooltip: false,
    width: 100,
    responsive: ['sm'],
    render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
];

export default columns;
