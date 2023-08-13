import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IoMdBriefcase } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@core/Modal/Modal';
import './PtwFormModal.scss';
import FormInput from '@core/FormInput/FormInput';
import FormControls from '@common/Forms/FormControls/FormControls';
import PtwDropzone from '../PtwDropzone/PtwDropzone';
import DeleteModal from '@common/DeleteModal/DeleteModal';
import {
  prepareInitialValues,
  validationSchema,
  prepareFormData,
} from './form.utils';
import {
  addCategory,
  addSubCategory,
  deleteCategories,
  deleteSubCategories,
  updateCategory,
  updateSubcategory,
} from '../../../../redux/ptwSlice/ptwSlice';
import FormTextarea from '../../../../common/@core/FormInput/FormTextarea';

const PtwFormModal = ({
  closeModal,
  entity,
  modal,
  activeTab,
  activeSubCategory,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [sent, setSent] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  const posting = useSelector((state) => state.ptw.posting);
  const deleting = useSelector((state) => state.ptw.deleting);
  const error = useSelector((state) => state.ptw.error);
  console.log(activeTab);

  const { edit, data: initialData } = modal;

  // const initialData = data

  const initialValues = prepareInitialValues(initialData, edit);

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setSent(false);
      const withDescription = activeTab.type === 'equipment';
      if (!activeSubCategory && activeTab) {
        console.log('Adding category', activeTab);
        const data = prepareFormData(
          values,
          'ptw_topcategory_id',
          activeTab.id,
          withDescription
        );
        if (!edit) {
          dispatch(addCategory(data));
        } else {
          dispatch(
            updateCategory({
              id: initialData.id,
              data,
            })
          );
        }
      }
      if (activeSubCategory) {
        console.log('Adding sub category', activeSubCategory);
        const data = prepareFormData(
          values,
          'category_id',
          activeSubCategory.id
        );
        if (!edit) {
          dispatch(addSubCategory(data));
        } else {
          dispatch(
            updateSubcategory({
              id: initialData.id,
              data,
            })
          );
        }
      }
      setSent(true);
    },
  });

  const deleteHandler = () => {
    if (edit) {
      const formdata = new FormData();
      formdata.append(`ids[0]`, initialData.id);
      const idsToDelete = [initialData.id];
      if (activeSubCategory) {
        console.log('deleting sub category');
        dispatch(deleteSubCategories({ data: formdata, ids: idsToDelete }));
      } else {
        dispatch(deleteCategories({ data: formdata, ids: idsToDelete }));
      }
      setDeleted(true);
    }
  };

  useEffect(() => {
    if (sent && !posting && !error) closeModal();
    if (error) console.log(error);
  }, [sent, posting, error]);

  useEffect(() => {
    if (deleted && !deleting && !error) {
      closeModal();
    }
  }, [closeModal, deleted, deleting, error]);

  return (
    <>
      <Modal rounded centered onTop={false}>
        <div className="ptw-form-modal">
          <form onSubmit={formik.handleSubmit}>
            <div className="ptw-form-modal__header">
              <div className="ptw-form-modal__header-title">
                <i className="case">
                  <IoMdBriefcase />
                </i>

                <p>
                  {edit ? 'Edit' : 'Add'} {entity ? entity : ' new item'}
                </p>
              </div>
              <i
                className="close-modal"
                onClick={() => {
                  // dispatch(clearError());
                  closeModal();
                }}
              >
                <IoClose />
              </i>
            </div>
            <div className="ptw-form-modal__content">
              <FormInput
                label={entity ? `${entity} name` : 'name'}
                placeholder={`Enter ${entity ? entity : 'item'} name...`}
                name="name"
                type="text"
                value={formik.values.name}
                changeHandler={formik.handleChange}
                variant="grey-label"
                error={formik.errors.name}
                onBlur={formik.handleBlur}
                touched={formik.touched.name}
              />
              <p className="ptw-form-modal__content-label">Images</p>
              <PtwDropzone
                files={formik.values.images}
                setFiles={(files) => formik.setFieldValue('images', files)}
                exitingImages={initialData ? initialData.images : null}
              />
              {activeTab.type === 'equipment' && (
                <FormTextarea
                  label="Description"
                  placeholder="Write a few sentences about the equipment"
                  name="description"
                  type="text"
                  variant="grey-label"
                  value={formik.values.description}
                  changeHandler={formik.handleChange}
                  error={formik.errors.description}
                  onBlur={formik.handleBlur}
                  touched={formik.touched.description}
                />
              )}

              <FormControls
                edit={edit}
                loader={posting}
                closeModal={closeModal}
              />
            </div>
            {edit && (
              <div
                onClick={() => setDeleteModal(true)}
                className="ptw-form-modal__delete"
              >
                <span>
                  <RiDeleteBin6Line />
                </span>
              </div>
            )}
          </form>
        </div>
      </Modal>
      <AnimatePresence initial={false} mode="wait">
        {deleteModal && (
          <DeleteModal
            entity={modal.data?.name}
            modal={deleteModal}
            loader={deleting}
            // setToast={setToast}
            type={entity ? entity : 'Item'}
            closeModal={() => setDeleteModal(false)}
            deleteHandler={deleteHandler}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PtwFormModal;
