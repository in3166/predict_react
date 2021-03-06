import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Table,
  Space,
  Button,
  message,
  Popconfirm,
  Spin,
  Breadcrumb,
} from 'antd';
import {
  DeleteFilled,
  PlusOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

import columns from './data/columns';
import {
  getAllPositions,
  deletePosition,
} from '../../../../_actions/position_actions';
import PositionAddModal from './Sections/PositionAddModal';
import PositionUpdateModal from './Sections/PositionUpdateModal';

function PositionManagePage() {
  const dispatch = useDispatch();
  const [Positions, setPositions] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [ShowAddModal, setShowAddModal] = useState(false);
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);
  const [SelectedPosition, setSelectedPosition] = useState({});

  const getPositions = () => {
    setLoading(true);
    dispatch(getAllPositions())
      .then(res => {
        if (res.payload.success) {
          setPositions(res.payload.positions);
        } else {
          message.error(`[Error]: ${res.payload.err}`);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };
  useMountEffect(getPositions);

  const onClickUpdate = position => {
    setSelectedPosition(position);
    setShowUpdateModal(true);
  };

  const deleteConfirm = position => {
    let body;
    if (position) {
      body = {
        _id: position,
      };
    } else {
      const selID = selectedRowKeys.map(v => v._id);
      body = {
        _id: selID,
      };
    }
    dispatch(deletePosition(body))
      .then(res => {
        const oktem = [];
        const failtem = [];

        if (res.payload.success) {
          res.payload.ok.forEach(v => {
            Positions.forEach(e => {
              if (e._id === v) oktem.push(e.id);
            });
          });

          message.success('????????? ??????????????????.');
          message.success(`[??????]: ${oktem}`);

          if (res.payload.fail.length !== 0) {
            res.payload.fail.forEach(v => {
              Positions.forEach(e => {
                if (e._id === v) failtem.push(e.name);
              });
            });

            message.warning('????????? ????????? ???????????? ????????????.');
            message.warning(`[??????]: ${failtem}`);
          }
        } else {
          message.error('?????? ?????? ??????: ????????? ????????? ???????????? ????????????.');
        }
      })
      .catch(err => {
        message.error(`[Error]: `, err);
      })
      .finally(() => {
        getPositions();
      });
  };

  const col2 = [
    {
      title: '??????',
      dataIndex: 'update',
      key: '4',
      render: (r, position) => {
        return (
          <Space size="middle">
            <Button onClick={() => onClickUpdate(position)}>
              <EditOutlined />
            </Button>
          </Space>
        );
      },
      width: 50,
      align: 'center',
    },
    {
      title: '??????',
      key: '5',
      render: (r, position) => {
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="????????? ?????????????????????????"
              onConfirm={() => deleteConfirm([position._id])}
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
      width: 50,
      align: 'center',
      responsive: ['sm'],
    },
  ];
  const col = [...columns, ...col2];

  const rowSelection = {
    ...selectedRowKeys._id,
    onChange: (selectedRowKey, sel2) => {
      setselectedRowKeys(sel2);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>????????? ??????</Breadcrumb.Item>
        <Breadcrumb.Item>?????? ??????</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={Loading}>
        <div style={{ backgroundColor: 'white', padding: 20 }}>
          <div style={{ float: 'left', paddingLeft: '7px' }}>
            <h3>
              <strong>?????? ??????</strong>
            </h3>
          </div>
          <div style={{ float: 'right' }}>
            <Space>
              <Button onClick={() => setShowAddModal(true)}>
                <PlusOutlined />
              </Button>
              <Space size="middle">
                <Popconfirm
                  placement="leftBottom"
                  title="????????? ?????????????????????????"
                  onConfirm={() => deleteConfirm()}
                  okText="Yes"
                  cancelText="No"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                >
                  <Button>
                    <DeleteFilled />
                  </Button>
                </Popconfirm>
              </Space>
              <Button onClick={getPositions}>
                <ReloadOutlined />
              </Button>
            </Space>
            <PositionAddModal
              ShowAddModal={ShowAddModal}
              setShowAddModal={setShowAddModal}
              getPositions={getPositions}
            />
            <PositionUpdateModal
              ShowUpdateModal={ShowUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
              getPositions={getPositions}
              Position={SelectedPosition}
            />
            <br />
            <br />
          </div>

          <Table
            style={{ overflow: 'auto' }}
            rowSelection={rowSelection}
            columns={col}
            dataSource={Positions}
            bordered
            tableLayout="auto"
            scroll
            rowKey="_id"
          />
        </div>
      </Spin>
    </>
  );
}

export default PositionManagePage;
