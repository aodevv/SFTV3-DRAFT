import { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaUser, FaUserTie } from 'react-icons/fa';
import { useFormik, FormikProvider, FieldArray } from 'formik';

import Modal from '@core/Modal/Modal';
import AddCard from '@core/AddCard/AddCard';
import FormControls from '../../Forms/FormControls/FormControls';
import ContactPersonForm from '../../Forms/ContactPersonForm/ContactPersonForm';
import { prepareInitialValues, validationSchema } from './ContactPersonUtils';

import './ContactPersonModal.scss';
import { clearError } from '../../../redux/clientSlice/clientSlice';
import { useDispatch, useSelector } from 'react-redux';

const ContactPersonModal = ({
  modal,
  closeModal,
  setToast,
  clientId,
  readOnly,
}) => {
  const { edit, persons, id } = modal;
  // const [done, setDone] = useState(false);
  const [deletedIds, setDeletedIds] = useState([]);

  const dispatch = useDispatch();

  const posting = useSelector((state) => state.client.posting);
  const error = useSelector((state) => state.client.error);

  let initialValues;

  const existingIds = persons.map((person) => person.id);
  // const existingIds = []

  const initialPersons = prepareInitialValues(persons);

  initialValues =
    persons.length > 0
      ? { contacts: initialPersons }
      : {
          contacts: [
            {
              first_name: '',
              last_name: '',
              profile_photo: '',
              picture: [],
              acronym: '',
              birthday: '',
              phoneCode: '',
              phoneNum: '',
              email: '',
            },
          ],
        };

  const formik = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      console.log(values);
      // const formData = { ...values };
      // const newContacts = formData.person_clients.map((contact) => {
      //   const copy = { ...contact };
      //   const phone = `${copy.phoneCode} ${copy.phoneNum?.replace(/ /g, '')}`;
      //   delete copy.phoneCode;
      //   delete copy.phoneNum;
      //   return { ...copy, phone };
      // });

      // formData.person_clients = newContacts;
      // const formdata = new FormData();

      // deletedIds.forEach((delId) => {
      //   const { id, formId } = delId;
      //   formdata.append(`contactPerson[${formId}][delete_person_id]`, id);
      // });

      // formData.person_clients.forEach((contact, index) => {
      //   if (
      //     existingIds.includes(contact.id) &&
      //     !deletedIds.includes(contact.id)
      //   ) {
      //     formdata.append(`contactPerson[${index}][id]`, contact.id);
      //   }
      //   if (typeof contact.picture === 'string')
      //     formdata.append(`contactPerson[${index}][person_picture]`, '');
      //   else if (contact.picture.length > 0)
      //     formdata.append(
      //       `contactPerson[${index}][person_picture]`,
      //       contact.picture[0]
      //     );

      //   formdata.append(
      //     `contactPerson[${index}][person_firstname]`,
      //     contact.first_name
      //   );
      //   formdata.append(
      //     `contactPerson[${index}][person_lastname]`,
      //     contact.last_name
      //   );
      //   formdata.append(
      //     `contactPerson[${index}][person_acronym]`,
      //     contact.acronym
      //   );
      //   formdata.append(`contactPerson[${index}][person_phone]`, contact.phone);
      //   formdata.append(`contactPerson[${index}][person_email]`, contact.email);
      //   formdata.append(
      //     `contactPerson[${index}][person_birthday]`,
      //     contact.birthday
      //   );
      // });
      // setDone(true);

      // for (var pair of formdata.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      // dispatch(editClientContacts({ formdata, id: clientId }));
    },
  });

  // useEffect(() => {
  //   if (!posting && done && !error) {
  //     setToast({
  //       show: true,
  //       text: `The contact persons have been edited successfully!`,
  //       type: 'success',
  //     });
  //     closeModal();
  //   }
  // }, [posting, done, error]);

  // useEffect(() => {
  //   if (error) {
  //     setDone(false);
  //     setToast({
  //       show: true,
  //       text: `${error}`,
  //       type: 'fail',
  //     });
  //   }
  // }, [error]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <Modal centered={true} rounded={true}>
      <div className="contact-person-modal">
        <div className="contact-person-modal__header">
          <div className="contact-person-modal__header-title">
            <i className="icon">
              <FaUser />
            </i>

            <p> Contact persons</p>
          </div>
          <i className="close-modal" onClick={closeModal}>
            <IoClose />
          </i>
        </div>
        <div className="contact-person-modal__content">
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <FieldArray name="contacts">
                {(arrayHelpers) => (
                  // ({ id, handleDelete, formik, contact, edit })
                  <div>
                    {formik.values.contacts.map((person_client, index) => (
                      <ContactPersonForm
                        readOnly={true}
                        formik={formik}
                        key={`form-${index}`}
                        id={index}
                        edit={edit}
                        handleDelete={() => {
                          arrayHelpers.remove(index);
                          if (person_client.id)
                            setDeletedIds([
                              ...deletedIds,
                              { id: person_client.id, formId: index },
                            ]);
                        }}
                      />
                    ))}
                    {/* {formik.values.contacts.length < 3 && (
                      <AddCard
                        icon={<FaUserTie />}
                        width="100%"
                        height="167px"
                        handleClick={() =>
                          arrayHelpers.push({
                            first_name: '',
                            last_name: '',
                            acronym: '',
                            birthday: '',
                            profile_photo: '',
                            picture: [],
                            function: '',
                            phoneCode: '',
                            phoneNum: '',
                            email: '',
                          })
                        }
                        text="Add a new contact person"
                      />
                    )} */}
                  </div>
                )}
              </FieldArray>
              {/* <div className="contact-person-modal__content-controls">
                {error && <p>* {error}</p>}

                <FormControls
                  edit
                  loader={posting}
                  formik={formik}
                  closeModal={closeModal}
                />
              </div> */}
            </form>
          </FormikProvider>
        </div>
      </div>
    </Modal>
  );
};

export default ContactPersonModal;
