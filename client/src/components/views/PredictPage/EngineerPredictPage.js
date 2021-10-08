import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Spin,
  Space,
  Checkbox,
  Popconfirm,
  Tabs,
  Row,
  Table,
  Col,
  message,
  Breadcrumb,
  Card,
} from 'antd';
import { DeleteFilled, QuestionCircleOutlined } from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import datas from './Sections/datas';

const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  'Apple',
  'Pear',
  'Orange',
  '1',
  '2',
  '123123123123',
  '414123',
  '151233',
  '151234',
  '151235',
  '151236',
  '151237',
  '151238',
  '151239',
  '1512310',
  '1512313',
];
const defaultCheckedList = ['Apple', 'Orange'];

const { TabPane } = Tabs;
const data = [
  {
    key: '1',
    name: 'a',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'ac',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'ab',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'd',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

function EngineerPredictPage() {
  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const [selectedRowKey, setselectedRowKeys] = useState([]);
  const [Render, setRender] = useState(false);
  const [LineDatas, setLineDatas] = useState({});
  const [loading, setLoading] = useState(false);

  const onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    setselectedRowKeys(selectedRowKeys);
  };

  const renderLine = dataLine => {
    // setLoading(false);
    setLineDatas(dataLine);
    setRender(true);
  };

  const flaskReq = () => {
    setLoading(true);
    axios
      .get('/api/predict/engine1')
      .then(res => {
        if (res.data.success) {
          const { a, date, x } = res.data.data;
          const dataLine = datas(date, x, a);
          renderLine(dataLine);
          message.success('Success!');
        } else {
          // setLoading(false);
          message.error('결과를 가져오지 못했습니다.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteConfirm = userDel => {
    const body = {
      id: userDel.id,
    };

    axios.post('/api/users/deleteUser', body).then(res => {
      if (res.data.success) {
        message.success('회원 탈퇴를 완료하였습니다.');
      } else {
        message.error('회원 탈퇴를 실패하였습니다.', res.data.err);
      }
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1,
      },
      width: 100,
    },
    {
      title: 'Engine',
      dataIndex: 'chinese',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 2,
      },
      width: 200,
    },
    {
      title: 'Description',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 3,
      },
    },
    {
      title: '예상 수명',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 4,
      },
      width: 200,
    },
    {
      title: '삭제',
      key: 'action',
      render: (r, userDel) => {
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteConfirm(userDel)}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button>
                <DeleteFilled />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
      width: 70,
      align: 'center',
      responsive: ['sm'],
    },
  ];

  const rowSelection = {
    selectedRowKey,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };
  const onChange = checkedList2 => {
    setCheckedList(checkedList2);
    setIndeterminate({
      indeterminate:
        !!checkedList2.length && checkedList2.length < plainOptions.length,
    });
    setCheckAll(checkedList2.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const GoodFruitForm = () => (
    <CheckboxGroup
      options={plainOptions}
      onChange={onChange}
      value={checkedList}
    />
  );
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>예측 결과 분석</Breadcrumb.Item>
        <Breadcrumb.Item>엔지니어 분석</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs
        defaultActiveKey="1"
        size="large"
        style={{ background: 'white', padding: '0 20px 10px 20px' }}
      >
        <TabPane tab="Engine-1" key="1">
          <Row type="flex" align="top" style={{ width: '100%' }}>
            <Col
              md={24}
              xl={2}
              order={4}
              style={{ height: '100%', minWidth: '140px' }}
            >
              <p>부품 목록</p>
              <div
                style={{
                  overflowX: 'hidden',
                  height: '100%',
                  borderRight: '1px solid #E9E9E9',
                }}
              >
                <div
                  style={{
                    borderBottom: '1px solid #E9E9E9',
                  }}
                >
                  <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                    style={{
                      overflow: 'hidden',
                    }}
                  >
                    Check all
                  </Checkbox>
                </div>
                <br />
                {GoodFruitForm()}
              </div>
              <br />
              <Button onClick={flaskReq} disabled={loading}>
                조회
              </Button>
              <br />
              <br />
            </Col>

            <Col
              md={22}
              xl={19}
              style={{ height: '100%' }}
              order={4}
              offset={1}
            >
              <Row>
                <Card
                  className="predictCard"
                  bordered
                  style={{ width: '100%', minHeight: 300 }}
                >
                  <Spin spinning={loading} tip="Loading..." size="large">
                    {Render && (
                      <div style={{ minHeight: 300 }}>
                        <Line
                          data={LineDatas?.chartData}
                          legend={LineDatas?.legend}
                          options={LineDatas?.options}
                        />
                      </div>
                    )}
                  </Spin>
                </Card>
              </Row>
              <hr />
              <Row>
                <Table
                  size="small"
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={data}
                  style={{ width: '100%' }}
                />
              </Row>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Engine-2" key="2">
          <div>Engine-2</div>
        </TabPane>
        <TabPane tab="Engine-3" key="3">
          <div>Engine-3</div>
        </TabPane>
        <TabPane tab="Engine-4" key="4">
          <div>Engine-4</div>
        </TabPane>
      </Tabs>
    </>
  );
}

export default EngineerPredictPage;