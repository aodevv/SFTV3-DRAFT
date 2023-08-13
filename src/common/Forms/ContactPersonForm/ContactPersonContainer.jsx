import ContactPersonForm from './ContactPersonForm';
import AddCard from '../../@core/AddCard/AddCard';

import { FieldArray } from 'formik';
import { FaUserTie } from 'react-icons/fa';

import './ContactPersonForm.scss';

const ContactPersonContainer = ({ formik, setDeletedIds, deletedIds }) => {
  return (
    <>
      <div className="contact-person-form__container">
        {
          <FieldArray name="contacts">
            {(arrayHelpers) => (
              <div>
                {formik.values.contacts?.map((person_client, index) => (
                  <ContactPersonForm
                    contact={person_client}
                    formik={formik}
                    key={`form-${index}`}
                    id={index}
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
                {formik.values.contacts?.length < 3 && (
                  <AddCard
                    icon={<FaUserTie />}
                    width="100%"
                    height="167px"
                    handleClick={() => {
                      arrayHelpers.push({
                        first_name: '',
                        last_name: '',
                        acronym: '',
                        birthday: '',
                        profile_photo: '',
                        phoneCode: '',
                        phoneNum: '',
                        email: '',
                      });
                    }}
                    text="Add a new contact person"
                  />
                )}
              </div>
            )}
          </FieldArray>
        }
      </div>
    </>
  );
};

export default ContactPersonContainer;
