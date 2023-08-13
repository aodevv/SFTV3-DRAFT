import { useEffect, useState } from 'react';
import { IoMdBriefcase } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { FormikProvider, useFormik } from 'formik';

import Modal from '@core/Modal/Modal';
import './UserModal.scss';
import UserForm from '../UserForm/UserForm';
import FormControls from '@common/Forms/FormControls/FormControls';
import {
  clearUserError,
  editUser,
  postUser,
  resetUserFetch,
} from '../../../../redux/userSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  prepareFormData,
  prepareInitialValues,
  validationSchema,
} from './user.utils';
import { postFunction } from '../../../../redux/functionSlice/functionSlice';

const UserModal = ({
  modal,
  closeModal,
  toast,
  roles,
  functions,
  setExistingFunction,
}) => {
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const { edit, user } = modal;

  const posting = useSelector((state) => state.user.posting);
  const error = useSelector((state) => state.user.error);

  const initialValues = prepareInitialValues(user, edit, functions);
  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: (values) => {
      const formData = prepareFormData({ values, edit });

      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      if (edit) {
        dispatch(editUser({ id: user.id, data: formData }));
      } else {
        dispatch(postUser(formData));
      }
      setDone(true);
    },
  });

  useEffect(() => {
    if (!posting && done && !error) {
      if (!edit) {
        toast.showSuccessToast('User added successfully');
      } else {
        toast.showSuccessToast('User updated successfully');
      }
      closeModal();
    }
  }, [posting, done, error]);

  useEffect(() => {
    if (error) {
      setDone(false);
      toast.showErrorToast(error);
      setTimeout(() => {
        dispatch(clearUserError());
      }, 100);
    }
  }, [error]);
  useEffect(() => {
    if (edit) {
      if (user.super_admin_function?.function) {
        setExistingFunction(user.super_admin_function?.function?.id);
        // dispatch(postFunction(user.super_admin_function?.function?.name));
        // dispatch(resetUserFetch());
      }
    }

    return () => {
      setExistingFunction(null);
    };
  }, []);

  return (
    <Modal rounded centered>
      <div className="user-modal">
        <div className="user-modal__header">
          <div className="user-modal__header-title">
            <i className="case">
              <IoMdBriefcase />
            </i>

            <p>{edit ? 'Edit' : 'Add'} user</p>
          </div>
          <i
            className="close-modal"
            onClick={() => {
              closeModal();
            }}
          >
            <IoClose />
          </i>
        </div>
        <div className="user-modal__content">
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <UserForm
                existingImg={user?.profile_photo || ''}
                formik={formik}
                roles={roles}
                functions={functions}
                edit={edit}
              />

              <div className="user-modal__content-controls">
                <FormControls
                  edit={edit}
                  loader={posting}
                  closeModal={closeModal}
                />
              </div>
            </form>
          </FormikProvider>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
