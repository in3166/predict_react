import React from 'react';
import { Modal, Table, Button } from 'antd';
import PropTypes from 'prop-types';

const { Column } = Table;
function PartsModal(props) {
  const { ShowPartsModal, setShowPartsModal, PartsInfo } = props;

  const newParts = PartsInfo.map((a, i) => {
    const temp = a.part;
    temp.requiredNumber = a.requiredNumber;
    temp.key = i;

    return a.part;
  });

  return (
    <Modal
      title="구성 부품"
      width="90%"
      visible={ShowPartsModal}
      onCancel={() => setShowPartsModal(false)}
      footer={[
        <Button key="back" onClick={() => setShowPartsModal(false)}>
          OK
        </Button>,
      ]}
    >
      <Table dataSource={newParts}>
        <Column title="Section.1" dataIndex="section1" key="section1" />
        <Column title="Section.2" dataIndex="section2" key="section2" />
        <Column title="이름" dataIndex="name" key="name" />
        <Column title="가격" dataIndex="price" key="price" />
        <Column title="설명" dataIndex="desc" key="desc" />
        <Column
          title="필요 개수"
          dataIndex="requiredNumber"
          key="requiredNumber"
        />
      </Table>
    </Modal>
  );
}

export default PartsModal;

PartsModal.propTypes = {
  ShowPartsModal: PropTypes.bool.isRequired,
  setShowPartsModal: PropTypes.func.isRequired,
  PartsInfo: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
