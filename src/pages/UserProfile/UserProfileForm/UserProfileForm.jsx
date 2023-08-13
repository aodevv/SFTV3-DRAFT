import { FaUser } from 'react-icons/fa';

import DeletableSelectAsync from '@core/DeletableSelect/DeletableSelectAsync';
import FormInput from '@core/FormInput/FormInput';
import FormSelect from '@core/FormInput/FormSelect';
import FormPhoneSelect from '@core/FormInput/FormPhoneSelect';
import DatePicker from '@core/DatePicker/DatePicker';
import './UserProfileForm.scss';
import { useEffect } from 'react';

const UserProfileForm = ({
  formik,
  roles,
  functions,
  activeUser,
  setExistingFunction,
}) => {
  useEffect(() => {
    if ((formik.values.first_name, formik.values.last_name)) {
      const fname = formik.values.first_name.toUpperCase();
      const lname = formik.values.last_name.toUpperCase();

      formik.setFieldValue(`acronym`, `${fname.charAt(0)}${lname.charAt(0)}`);
    }
  }, [formik.values.first_name, formik.values.last_name]);

  useEffect(() => {
    if (activeUser.super_admin_function?.function?.hidden === true) {
      setExistingFunction(activeUser.super_admin_function?.function?.id);
    }
  }, []);

  return (
    <>
      <div className="user-profile-form">
        <div className="user-profile-form__divider">
          <i>
            <FaUser />
          </i>
          <p>Personal information</p>
        </div>
        <div className="user-profile-form__inputs">
          <div className="userform-3columns">
            <FormInput
              label="First name"
              placeholder="Enter first name"
              name="first_name"
              type="text"
              capitalize
              value={formik.values.first_name}
              changeHandler={formik.handleChange}
              error={formik.errors.first_name}
              onBlur={formik.handleBlur}
              touched={formik.touched.first_name}
            />
            <FormInput
              label="Last name"
              placeholder="Enter last name"
              name="last_name"
              type="text"
              uppercase
              value={formik.values.last_name}
              changeHandler={formik.handleChange}
              error={formik.errors.last_name}
              onBlur={formik.handleBlur}
              touched={formik.touched.last_name}
            />

            <FormInput
              label="Acronym"
              // placeholder="Enter acronym"
              name="acronym"
              type="text"
              uppercase
              disabled={true}
              value={formik.values.acronym}
              changeHandler={formik.handleChange}
            />
          </div>
          <div className="userform-3columns">
            <div className="user-profile-form__datepicker">
              <p>Birthday</p>

              <DatePicker
                name="birthday"
                value={formik.values.birthday}
                error={formik.errors.birthday}
                onBlur={formik.handleBlur}
                setTouched={() => formik.setFieldTouched(`birthday`, true)}
                touched={formik.touched.birthday}
                changeHandler={(value) =>
                  formik.setFieldValue(`birthday`, value)
                }
              />
            </div>

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
              position="bottom"
              errors={formik.errors}
              touched={formik.touched}
              onBlur={formik.handleBlur}
            />
            <FormInput
              label="Email"
              placeholder="Enter email"
              name="email"
              type="text"
              value={formik.values.email}
              changeHandler={formik.handleChange}
              error={formik.errors.email}
              onBlur={formik.handleBlur}
              touched={formik.touched.email}
            />
          </div>
          <div className="userform-2columns">
            <DeletableSelectAsync
              options={functions}
              label="Function"
              position="bottom"
              placeholder="Select function"
              name="function_id"
              formikField={'function_id'}
              edit={true}
              formik={formik}
              value={formik.values.function_id}
              changeHandler={(value) =>
                formik.setFieldValue(`function_id`, value.value)
              }
              error={formik.errors.function_id}
              onBlur={formik.handleBlur}
              touched={formik.touched.function_id}
            />
            <FormSelect
              label="Role"
              placeholder="Select role"
              name="role_id"
              position="bottom"
              options={roles}
              value={formik.values.role_id}
              changeHandler={(value) =>
                formik.setFieldValue('role_id', value.value)
              }
              error={formik.errors.role_id}
              onBlur={formik.handleBlur}
              touched={formik.touched.role_id}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileForm;
