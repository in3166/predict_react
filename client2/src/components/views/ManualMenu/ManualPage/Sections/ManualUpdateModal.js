import React, { useState, useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateManual } from '../../../../../_actions/manual_actions';

function ManualUpdateModal(props) {
  const {
    showUpdateConfirm,
    setshowUpdateConfirm,
    selectedManual,
    getManuals,
  } = props;
  const dispatch = useDispatch();
  const [manual, setmanual] = useState({});
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [form] = Form.useForm();
  useEffect(() => {
    setmanual(selectedManual);
    reset(selectedManual); // 처음 설정 시 value가 안먹히는 문제 해결
    return () => {
      setmanual({});
    };
  }, [reset, selectedManual]);

  const modalOnOk = manualText => {
    const body = {
      /* eslint no-underscore-dangle: 0 */
      _id: manual._id,
      id: manualText.id,
      name: manualText?.name,
      desc: manualText?.desc,
    };
    console.log('body: ', body);

    dispatch(updateManual(body))
      .then(res => {
        if (res.payload.success) {
          message.success('성공');
        } else {
          message.error('실패: ', res.payload.message);
        }
      })
      .catch(err => {
        message.error('[error]: ', err);
      })
      .finally(() => {
        getManuals();
        setshowUpdateConfirm(false);
      });
  };

  return (
    <div>
      <Modal
        title="부품 정보 수정"
        style={{ top: 50 }}
        visible={showUpdateConfirm}
        destroyOnClose
        onOk={form.submit}
        onCancel={() => setshowUpdateConfirm(false)}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
          form={form}
          onFinish={handleSubmit(modalOnOk)}
          key={manual}
          preserve={false}
        >
          <Form.Item label="ID">
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="on"
              className="form_input"
              error={errors.id}
              defaultValue={manual?.id}
              {...register('id', { minLength: 3 })}
            />
            {errors.id && errors.id.type === 'minLength' && (
              <p className="form_p">
                This field must have at least 3 characters
              </p>
            )}
          </Form.Item>
          <Form.Item label="이름">
            <input
              id="name"
              name="name"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.name}
              defaultValue={manual?.name}
              {...register('name', { required: true, maxLength: 50 })}
            />
            {errors.name && errors.name.type === 'required' && (
              <p className="form_p">This name field is required</p>
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
          <Form.Item label="설명">
            <input
              name="desc"
              type="text"
              autoComplete="on"
              error={errors.desc}
              defaultValue={manual?.desc}
              {...register('desc', { maxLength: 100 })}
              className="form_input"
            />
            {errors.desc && errors.desc.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManualUpdateModal;

ManualUpdateModal.propTypes = {
  showUpdateConfirm: PropTypes.bool.isRequired,
  setshowUpdateConfirm: PropTypes.func.isRequired,
  selectedManual: PropTypes.objectOf(PropTypes.any).isRequired,
  getManuals: PropTypes.func.isRequired,
};