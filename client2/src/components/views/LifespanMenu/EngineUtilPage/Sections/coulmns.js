const engineCol = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    width: 100,
  },
  {
    title: '이름',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 100,
  },
  {
    title: '예상 수명',
    dataIndex: 'defaultLifespan',
    sorter: {
      compare: (a, b) => a.defaultLifespan - b.defaultLifespan,
      multiple: 5,
    },
    width: 100,
    render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
];

const partCol = [
  {
    title: 'Section.1',
    dataIndex: ['part', 'section1'],
    key: 'section1',
    sorter: {
      compare: (a, b) => a.part.section1.localeCompare(b.part.section1),
      multiple: 3,
    },
  },
  {
    title: 'Section.2',
    dataIndex: ['part', 'section2'],
    key: 'section2',
    sorter: {
      compare: (a, b) => a.part.section2.localeCompare(b.part.section2),
      multiple: 3,
    },
  },
  {
    title: '이름',
    dataIndex: ['part', 'name'],
    key: 'name2',
    sorter: {
      compare: (a, b) => a.part.name.localeCompare(b.part.name),
      multiple: 3,
    },
  },
  {
    title: '가격',
    dataIndex: ['part', 'price'],
    key: 'price',
    sorter: {
      compare: (a, b) => a.part.price - b.part.price,
      multiple: 5,
    },
    render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
  {
    title: '설명',
    dataIndex: ['part', 'desc'],
    key: 'desc',
    sorter: {
      compare: (a, b) => a.part.desc.localeCompare(b.part.desc),
      multiple: 3,
    },
    responsive: ['md'],
  },
  {
    title: '예상 수명',
    dataIndex: ['part', 'defaultLifespan'],
    key: 'defaultLifespan',
    sorter: {
      compare: (a, b) => a.part.defaultLifespan - b.part.defaultLifespan,
      multiple: 5,
    },
    render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
  {
    title: '필요 수량',
    dataIndex: 'requiredNumber',
    key: 'requiredNumber',
    sorter: {
      compare: (a, b) => a.requiredNumber - b.requiredNumber,
      multiple: 5,
    },
    render: value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
  },
];

export { engineCol, partCol };
