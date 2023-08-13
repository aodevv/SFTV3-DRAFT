import { useState, useEffect } from 'react';
import { IoMdBriefcase } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { RiErrorWarningFill } from 'react-icons/ri';
import { useFormik, FormikProvider } from 'formik';

import Modal from '@core/Modal/Modal';
import ClientForm from '@common/Forms/ClientForm/ClientForm';
import FormControls from '@common/Forms/FormControls/FormControls';
import ContactPersonContainer from '@common/Forms/ContactPersonForm/ContactPersonContainer';
import {
  prepareFormData,
  prepareInitialValues,
  removeNulls,
  validationSchema,
} from './ContractorUtils';

import './ClientModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearError,
  editClient,
  postClient,
} from '../../../redux/clientSlice/clientSlice';

const ClientModal = ({ closeModal, modal, toast, countries }) => {
  const { edit, data: client } = modal;

  const [right, setRight] = useState(true);
  const [contactError, setContactsError] = useState(false);
  const [mainFormError, setMainFormError] = useState(false);
  const [done, setDone] = useState(false);
  const [name, setName] = useState(modal.edit ? modal.data.name : '');
  const [deletedIds, setDeletedIds] = useState([]);

  // const [initialEmail, setInitialEmail] = useState(edit ? client.email : null);

  const existingCountry = edit ? client.country : null;

  const posting = useSelector((state) => state.client.posting);
  const error = useSelector((state) => state.client.error);

  const dispatch = useDispatch();

  let clientValues = null;
  let existingIds;

  if (client) {
    clientValues = removeNulls(client)[0];
    existingIds = removeNulls(client)[1];
  }

  const initialValues = prepareInitialValues(clientValues, edit);

  const existingImg = initialValues.logo;

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      console.log(
        '🚀 ~ file: ClientModal.jsx:66 ~ ClientModal ~ values:',
        values
      );

      const formdata = prepareFormData({
        values,
        deletedIds,
        existingIds,
        edit,
      });

      // for (var pair of formdata.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      setDone(true);

      if (edit) {
        const { id } = client;
        dispatch(editClient({ formdata, id }));
      } else {
        setName(values.name);

        dispatch(postClient(formdata));
      }
    },
  });

  const openRightForm = () => setRight(true);
  const openLeftForm = () => setRight(false);

  useEffect(() => {
    if (formik.errors.contacts) {
      setContactsError(true);
    } else {
      setContactsError(false);
    }

    if (Object.keys(formik.errors).length !== 0) {
      setMainFormError(true);
    } else {
      setMainFormError(false);
    }
  }, [formik.errors]);

  useEffect(() => {
    // Removing pictures previews when components dismounts
    return () =>
      Array.isArray(formik.values.logo) &&
      formik.values.logo.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(() => {
    if (!posting && done && !error) {
      toast.showSuccessToast(
        `The client "${name}" has been ${
          edit ? 'edited' : 'created'
        } successfully!`
      );
      closeModal();
    } else {
      if (error) {
        toast.showErrorToast(error);
      }
    }
  }, [posting, done, error, name]);

  useEffect(() => {
    if (error) {
      setDone(false);
      toast.showErrorToast(error);
    }
  }, [error]);

  return (
    <Modal rounded={true} onTop={true}>
      <div className="client-modal">
        <div className="client-modal__header">
          <div className="client-modal__header-title">
            <i className="case">
              <IoMdBriefcase />
            </i>

            <p>{edit ? 'Edit' : 'Add'} client</p>
          </div>
          <i
            className="close-modal"
            onClick={() => {
              dispatch(clearError());
              closeModal();
            }}
          >
            <IoClose />
          </i>
        </div>
        <div className="client-modal__subheader">
          <div
            onClick={openRightForm}
            className={`sb1 ${right && 'selected'} `}
          >
            Client
            <span className="warning">
              {mainFormError && !right && <RiErrorWarningFill />}
            </span>
          </div>
          <div
            onClick={openLeftForm}
            className={`sb2 ${!right && 'selected'} ${
              contactError && right && 'error'
            }`}
          >
            Contact person{' '}
            <span className="warning">
              {contactError && right && <RiErrorWarningFill />}
            </span>
          </div>
        </div>
        <div className="client-modal__content">
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              {right && (
                <ClientForm
                  error={error}
                  countries={countries}
                  existingImg={existingImg}
                  formik={formik}
                  edit={edit}
                  client={client}
                  existingCountry={existingCountry}
                />
              )}
              {!right && (
                <ContactPersonContainer
                  setDeletedIds={setDeletedIds}
                  deletedIds={deletedIds}
                  formik={formik}
                  edit={edit}
                />
              )}
              <FormControls
                edit={edit}
                loader={posting}
                formik={formik}
                closeModal={closeModal}
              />
            </form>
          </FormikProvider>
        </div>
      </div>
    </Modal>
  );
};

export default ClientModal;
