import { useEffect } from 'react';

import FormInput from '../../@core/FormInput/FormInput';
import FormPhoneSelect from '../../@core/FormInput/FormPhoneSelect';
import AvatarDropzone from '../../Dropzones/AvatarDropzone/AvatarDropzone';
import { FaUser } from 'react-icons/fa';

import DatePicker from '../../@core/DatePicker/DatePicker';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './ContactPersonForm.scss';

const ContactPersonForm = ({ id, handleDelete, formik, readOnly }) => {
  const phoneCodeError = formik.errors?.contacts?.[id]?.phoneCode;
  const phoneNumError = formik.errors?.contacts?.[id]?.phoneNum;
  const phoneCodeTouched = formik.touched?.contacts?.[id]?.phoneCode;
  const phoneNumTouched = formik.touched?.contacts?.[id]?.phoneNum;

  useEffect(() => {
    if (
      (formik.values.contacts[id].first_name,
      formik.values.contacts[id].last_name)
    ) {
      const fname = formik.values.contacts[id].first_name.toUpperCase();
      const lname = formik.values.contacts[id].last_name.toUpperCase();

      formik.setFieldValue(
        `contacts.${id}.acronym`,
        `${fname.charAt(0)}${lname.charAt(0)}`
      );
    }
  }, [
    formik.values.contacts[id].first_name,
    formik.values.contacts[id].last_name,
  ]);

  return (
    <div className={`contact-person-form ${id !== 0 && 'not-first'}`}>
      {/* {id !== 0 && ( */}
      {!readOnly && (
        <span onClick={() => handleDelete(id)} className="delete-form">
          <i>
            <RiDeleteBin6Line />
          </i>
        </span>
      )}

      {/* )} */}
      {id !== 0 && (
        <div className="contact-person-form__divider">
          <div className="name">
            {' '}
            <i>
              <FaUser />
            </i>{' '}
            Contact Person
          </div>
          <div className="line" />
        </div>
      )}
      <AvatarDropzone
        disabled={readOnly}
        className="contact-person-form__dropzone"
        img={formik.values.contacts[id].profile_photo}
        files={formik.values.contacts[id].profile_photo}
        setFiles={(file) =>
          formik.setFieldValue(`contacts.${id}.profile_photo`, file)
        }
      />

      <div className="contact-person-form__inputs">
        <FormInput
          disabled={readOnly}
          label="First name"
          capitalize
          placeholder="Enter first name"
          name={`contacts.${id}.first_name`}
          capi
          type="text"
          value={formik.values.contacts[id].first_name}
          changeHandler={formik.handleChange}
          error={formik.errors?.contacts?.[id]?.first_name}
          onBlur={formik.handleBlur}
          touched={formik.touched?.contacts?.[id]?.first_name}
        />
        <FormInput
          disabled={readOnly}
          label="Last name"
          placeholder="Enter last name"
          name={`contacts.${id}.last_name`}
          type="text"
          uppercase
          value={formik.values.contacts[id].last_name}
          changeHandler={formik.handleChange}
          error={formik.errors?.contacts?.[id]?.last_name}
          onBlur={formik.handleBlur}
          touched={formik.touched?.contacts?.[id]?.last_name}
        />
        {/* <FormInput
          label="Acronym"
          // placeholder="Enter acronym"
          name={`contacts.${id}.acronym`}
          disabled={true}
          type="text"
          value={formik.values.contacts[id].acronym}
        /> */}
        <FormInput
          disabled={readOnly}
          label="Acronym"
          // placeholder="Enter acronym"
          name={`contacts.${id}.acronym`}
          type="text"
          // disabled={true}
          value={formik.values.contacts[id].acronym}
          changeHandler={(e) => {
            formik.setFieldValue(`contacts.${id}.acronym`, e.target.value);
          }}
        />
        <div className="contact-person-form__datepicker">
          <p>Birthday</p>

          <DatePicker
            disabled={readOnly}
            name={`contacts.${id}.birthday`}
            value={formik.values.contacts[id].birthday}
            error={formik.errors?.contacts?.[id]?.birthday}
            onBlur={formik.handleBlur}
            setTouched={() =>
              formik.setFieldTouched(`contacts.${id}.birthday`, true)
            }
            touched={formik.touched?.contacts?.[id]?.birthday}
            changeHandler={(value) =>
              formik.setFieldValue(`contacts.${id}.birthday`, value)
            }
          />
        </div>
        <FormPhoneSelect
          disabled={readOnly}
          label="Telephone number"
          placeholder="Enter telephone number"
          inputName={`contacts.${id}.phoneNum`}
          selectName={`contacts.${id}.phoneCode`}
          type="text"
          selectValue={formik.values.contacts[id].phoneCode}
          inputValue={formik.values.contacts[id].phoneNum}
          changeHandler={formik.handleChange}
          clearInput={() => formik.setFieldValue(`contacts.${id}.phoneNum`, '')}
          selectChangeHandler={(value) =>
            formik.setFieldValue(`contacts.${id}.phoneCode`, value.code)
          }
          position="top"
          errors={{ phoneCode: phoneCodeError, phoneNum: phoneNumError }}
          touched={{ phoneCode: phoneCodeTouched, phoneNum: phoneNumTouched }}
          onBlur={formik.handleBlur}
        />
        <FormInput
          disabled={readOnly}
          label="Email"
          placeholder="Enter email"
          name={`contacts.${id}.email`}
          type="text"
          value={formik.values.contacts[id].email}
          changeHandler={formik.handleChange}
          error={
            formik.errors?.contacts?.[id]?.email || formik.errors?.unique_email
          }
          onBlur={formik.handleBlur}
          touched={formik.touched?.contacts?.[id]?.email}
        />
      </div>
    </div>
  );
};

export default ContactPersonForm;
