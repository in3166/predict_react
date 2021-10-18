import React from 'react';
import { Modal, Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { addPart } from '../../../../../_actions/part_actions';

function PartAddModal(props) {
  const { showAddConfirm, setshowAddConfirm, getParts } = props;

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [form] = Form.useForm();
  const modalOnOk = part => {
    const body = {
      id: part?.id,
      name: part?.name,
      defaultLifespan: part?.life,
      price: part?.price,
      desc: part?.desc,
    };

    dispatch(addPart(body))
      .then(res => {
        if (res.payload.success) {
          message.success('부품이 추가되었습니다.');
          getParts();
        } else {
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        document.getElementById('id').value = '';
        document.getElementById('name').value = '';
        document.getElementById('life').value = '';
        document.getElementById('price').value = '';
        document.getElementById('desc').value = '';
        setshowAddConfirm(false);
      });
  };

  return (
    <div>
      <Modal
        title="부품 추가"
        style={{ top: 200 }}
        visible={showAddConfirm}
        onOk={form.submit}
        onCancel={() => setshowAddConfirm(false)}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
          id="updateForm"
          form={form}
          onFinish={handleSubmit(modalOnOk)}
        >
          <Form.Item label="ID">
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="on"
              className="form_input"
              error={errors.id}
              {...register('id', { required: true, minLength: 3 })}
            />
            {errors.id && <p className="form_p">This id field is required</p>}
            {errors.id && errors.id.type === 'minLength' && (
              <p className="form_p">ID must have at least 3 characters</p>
            )}
          </Form.Item>
          <Form.Item label="부품 이름">
            <input
              id="name"
              name="name"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.name}
              {...register('name', { required: true, maxLength: 15 })}
            />
            {errors.name && errors.name.type === 'required' && (
              <p className="form_p">This name field is required</p>
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
          <Form.Item label="기본 수명">
            <input
              id="life"
              name="life"
              className="form_input"
              type="number"
              autoComplete="on"
              error={errors.life}
              {...register('life', { required: true })}
            />
            {errors.life && errors.life.type === 'required' && (
              <p className="form_p">This life field is required</p>
            )}
          </Form.Item>
          <Form.Item label="가격(원)">
            <input
              id="price"
              name="price"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.price}
              {...register('price', { required: true, maxLength: 20 })}
            />
            {errors.price && errors.price.type === 'required' && (
              <p className="form_p">This price field is required</p>
            )}
            {errors.price && errors.price.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
          <Form.Item label="설명">
            <input
              id="desc"
              name="desc"
              type="text"
              autoComplete="on"
              error={errors.desc}
              {...register('desc', { required: true, maxLength: 20 })}
              className="form_input"
            />
            {errors.desc && errors.desc.type === 'required' && (
              <p className="form_p">This desc field is required</p>
            )}
            {errors.desc && errors.desc.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default PartAddModal;

PartAddModal.propTypes = {
  getParts: PropTypes.func.isRequired,
  showAddConfirm: PropTypes.bool.isRequired,
  setshowAddConfirm: PropTypes.func.isRequired,
};
