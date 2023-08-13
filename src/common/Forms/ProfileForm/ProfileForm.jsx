import { useEffect } from 'react';

import FormInput from '../../@core/FormInput/FormInput';
import FormSelect from '../../@core/FormInput/FormSelect';
import DatePicker from '../../@core/DatePicker/DatePicker';
import FormPhoneSelect from '../../@core/FormInput/FormPhoneSelect';
import userIcon from '../../../assets/icons/userIcon.png';
import contactIcon from '../../../assets/icons/contactIcon.png';
import './ProfileForm.scss';

const ProfileForm = ({ formik, languages }) => {
  useEffect(() => {
    if ((formik.values.first_name, formik.values.last_name)) {
      const fname = formik.values.first_name.toUpperCase();
      const lname = formik.values.last_name.toUpperCase();

      formik.setFieldValue(`acronym`, `${fname.charAt(0)}${lname.charAt(0)}`);
    }
  }, [formik.values.first_name, formik.values.last_name]);
  return (
    <>
      <div className="profile-form">
        <div className="profile-form__divider">
          <i>
            <img src={userIcon} />
          </i>
          <p>Personal information</p>
        </div>
        <div className="pform-personal-info">
          <div className="pform-titles">
            <FormInput
              label="First Name"
              placeholder="Enter your first name"
              name="first_name"
              type="text"
              value={formik.values.first_name}
              changeHandler={formik.handleChange}
              error={formik.errors.first_name}
              onBlur={formik.handleBlur}
              touched={formik.touched.first_name}
            />
            <FormInput
              label="Last Name"
              placeholder="Enter your last name"
              name="last_name"
              type="text"
              value={formik.values.last_name}
              changeHandler={formik.handleChange}
              error={formik.errors.last_name}
              onBlur={formik.handleBlur}
              touched={formik.touched.last_name}
            />
            <FormInput
              label="Acronym"
              disabled
              name="acronym"
              type="text"
              value={formik.values.acronym}
            />
          </div>
          <div className="pform-info">
            <div className="profile-birthday">
              <p>Birthday</p>
              <DatePicker
                name={`birthday`}
                value={formik.values.birthday}
                error={formik.errors?.birthday}
                onBlur={formik.handleBlur}
                setTouched={() => formik.setFieldTouched(`birthday`, true)}
                touched={formik.touched?.birthday}
                changeHandler={(value) =>
                  formik.setFieldValue(`birthday`, value)
                }
              />
            </div>
            <FormSelect
              label="Native Language"
              placeholder="Enter your native language"
              name="native_langue_id"
              position="bottom"
              options={languages}
              value={formik.values.native_langue_id}
              changeHandler={(value) =>
                formik.setFieldValue('native_langue_id', value.value)
              }
              touched={formik.touched.native_langue_id}
              error={formik.errors.native_langue_id}
            />
            <FormSelect
              label="Other Languages"
              placeholder="Enter your other language"
              name="other_langue_id"
              position="bottom"
              options={languages}
              value={formik.values.other_langue_id}
              changeHandler={(value) =>
                formik.setFieldValue('other_langue_id', value.value)
              }
              touched={formik.touched.other_langue_id}
              error={formik.errors.other_langue_id}
            />
          </div>
        </div>
        <div className="profile-form__divider">
          <i>
            <img src={contactIcon} />
          </i>
          <p>Contact information</p>
        </div>
        <div className="profile-form__contact">
          <FormInput
            label="Role"
            name="role"
            type="text"
            value={formik.values.role}
            changeHandler={formik.handleChange}
            disabled={true}
          />
          <FormPhoneSelect
            label="Telephone number"
            placeholder="Enter telephone number"
            inputName="phoneNum"
            selectName="phoneCode"
            type="text"
            selectValue={formik.values.phoneCode}
            inputValue={formik.values.phoneNum}
            changeHandler={formik.handleChange}
            clearInput={() => formik.setFieldValue('phoneNum', '')}
            selectChangeHandler={(value) =>
              formik.setFieldValue('phoneCode', value.code)
            }
            position="top"
            errors={formik.errors}
            touched={formik.touched}
            onBlur={formik.handleBlur}
          />
          <FormInput
            label="Email"
            placeholder="Enter your email"
            name="email"
            type="text"
            value={formik.values.email}
            changeHandler={formik.handleChange}
            error={formik.errors.email}
            onBlur={formik.handleBlur}
            touched={formik.touched.email}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
