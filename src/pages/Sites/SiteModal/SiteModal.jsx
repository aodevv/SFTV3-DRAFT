import { useState, useEffect } from 'react';
import { useFormik, FormikProvider } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { IoMdBriefcase } from 'react-icons/io';
import { RiErrorWarningFill } from 'react-icons/ri';

import SiteForm from '@common/Forms/SiteForm/SiteForm';
import FormControls from '@common/Forms/FormControls/FormControls';
import ContactPersonContainer from '@common/Forms/ContactPersonForm/ContactPersonContainer';
import Modal from '@core/Modal/Modal';
// import { editSite, postSite } from '../../../redux/siteSlice/siteSlice';
import {
  validationSchema,
  prepareFormData,
  prepareInitialValues,
  removeNull,
  splitNestedPhone,
} from './SiteUtils';

import './SiteModal.scss';
import { editSite, postSite } from '../../../redux/siteSlice/siteSlice';

const SiteModal = ({
  modal,
  closeModal,
  toast,
  client,
  clientLogo,
  sitesEmails,
}) => {
  const { edit, data: site } = modal;

  const [right, setRight] = useState(true);
  const [contactError, setContactsError] = useState(false);
  const [mainFormError, setMainFormError] = useState(false);
  const [deletedIds, setDeletedIds] = useState([]);
  const [done, setDone] = useState(false);
  const [name, setName] = useState(edit ? site.name : '');

  const posting = useSelector((state) => state.site.posting);
  const error = useSelector((state) => state.site.error);

  const dispatch = useDispatch();

  let initialValues;
  let siteValues = null;

  if (site) {
    siteValues = removeNull(site);
  }

  let existingIds;
  if (siteValues) {
    const contacts = splitNestedPhone(siteValues);
    siteValues.contacts = contacts;
  }

  initialValues = prepareInitialValues({ edit, site, siteValues });
  if (initialValues) {
    existingIds = initialValues.contacts?.map(
      (person_client) => person_client.id
    );
  }

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      const formdata = prepareFormData({
        values,
        deletedIds,
        existingIds,
        client,
        edit,
      });

      setDone(true);

      for (var pair of formdata.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      if (edit) {
        const { id } = site;
        dispatch(editSite({ formdata, id }));
      } else {
        setName(values.name);

        dispatch(postSite({ formdata, clientId: client.id }));
      }
      console.log(values);
    },
  });

  const openRightForm = () => setRight(true);
  const openLeftForm = () => setRight(false);

  useEffect(() => {
    if (formik.errors.person_clients) {
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
    if (!posting && done && !error) {
      toast.showSuccessToast(
        `The site "${name}" Has been ${
          edit ? 'edited' : 'created'
        } successfully!`
      );
      closeModal();
    }
  }, [posting, done, error, name]);

  useEffect(() => {
    if (error) {
      toast.showErrorToast(error);
      setDone(false);
    }
  }, [error]);

  return (
    <Modal rounded={true} onTop>
      <div className="site-modal">
        <div className="site-modal__header">
          <div className="site-modal__header-title">
            <i className="case">
              <IoMdBriefcase />
            </i>

            <p>{edit ? 'Edit' : 'Add'} site</p>
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
        <div className="site-modal__subheader">
          <div onClick={openRightForm} className={`sb1 ${right && 'selected'}`}>
            Site
            <span className="warning">
              {mainFormError && !right && <RiErrorWarningFill />}
            </span>
          </div>
          <div onClick={openLeftForm} className={`sb2 ${!right && 'selected'}`}>
            Contact person{' '}
            <span className="warning">
              {contactError && right && <RiErrorWarningFill />}
            </span>
          </div>
        </div>
        <div className="site-modal__content">
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              {right && (
                <SiteForm
                  // error={error}
                  formik={formik}
                  edit={edit}
                  site={site}
                  clientLogo={clientLogo}
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

export default SiteModal;
