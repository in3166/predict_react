import React, { useState, useEffect } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import { Breadcrumb, Tabs, message, Spin, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getAllSites } from '../../../../_actions/site_actions';
import BranchTabContent from './Sections/BranchTabContent';

const { TabPane } = Tabs;
function BranchStocksPage() {
  const [Sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const site = useSelector(state => state.site.sites);

  const reload = () => {
    setLoading(true);
    dispatch(getAllSites())
      .then(res => {
        if (res.payload.success) {
          setSites(res.payload.sites);
        } else {
          message.error(res.payload.err);
        }
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getSites = () => {
    if (site?.sites) {
      setSites(site.sites);
    } else {
      reload();
    }
  };

  const useMountEffect = fun => useEffect(fun, []);
  useMountEffect(getSites);

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>부품/자재 재고 관리</Breadcrumb.Item>
        <Breadcrumb.Item>지사 재고 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Tabs
        defaultActiveKey="1"
        size="large"
        style={{ background: 'white', padding: '0 20px 10px 20px' }}
        tabBarExtraContent={
          <Button onClick={reload}>
            <ReloadOutlined />
          </Button>
        }
      >
        {Sites.length > 0 &&
          Sites.map((value, i) => {
            if (value.name === '본사') {
              return null;
            }
            const key = `tabs${i}`;
            return (
              <TabPane tab={value.name} key={key}>
                <Spin spinning={loading}>
                  <BranchTabContent
                    Sites={value}
                    Parts={value.partStock}
                    reload={reload}
                  />
                </Spin>
              </TabPane>
            );
          })}
      </Tabs>
    </>
  );
}

export default BranchStocksPage;
