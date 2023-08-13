import * as Yup from 'yup';
import _ from 'lodash';

export const validationSchema = Yup.object({
  first_name: Yup.string().required('* First name is required'),
  last_name: Yup.string().required('* First name is required'),
  function_id: Yup.mixed().required('* Function is required'),
  phoneNum: Yup.string().required('* Phone number is required'),
  //   .required("* Phone number required"),
  phoneCode: Yup.string().required('* Phone number incomplete'),
  role_id: Yup.mixed().required('* Function is required'),
  email: Yup.string()
    .email('* Email must be valid')
    .required('* Email is required'),
});
export const removeNulls = (obj) => {
  let values = _.mapValues(obj, (value) => {
    return value === null ? '' : value;
  });
  return values;
};

export const prepareInitialValues = (values, edit) => {
  if (edit) {
    const userValues = removeNulls(values);
    // const oldFuncId = userValues.super_admin_function?.function?.id;
    // const functionFound = functions.find((el) => el.value === oldFuncId);
    return {
      date: userValues.updated_at,
      status: userValues.status,
      first_name: userValues.first_name,
      last_name: userValues.last_name,
      acronym: userValues.acronym,
      birthday: userValues.birthday,
      phoneCode:
        userValues.phone?.indexOf(' ') > -1
          ? userValues.phone?.slice(0, 2)
          : '',
      phoneNum:
        userValues.phone?.indexOf(' ') > -1
          ? userValues.phone?.slice(2)
          : userValues.phone,
      email: userValues.email,
      function_id: userValues.super_admin_function?.function?.id
        ? userValues.super_admin_function?.function?.id
        : '',
      new_fct: '',
      role_id: userValues.role?.id,
      profile_photo: userValues.profile_photo,
    };
  } else {
    return {
      date: '',
      status: '',
      first_name: '',
      last_name: '',
      acronym: '',
      birthday: '',
      phoneCode: '',
      phoneNum: '',
      email: '',
      function_id: '',
      new_fct: '',
      role_id: '',
      profile_photo: [],
    };
  }
};

export const prepareFormData = ({ values, edit }) => {
  const formData = { ...values };
  let cleanNum = formData.phoneNum;
  const phone = `${formData.phoneCode} ${cleanNum?.replace(/ /g, '')}`;
  delete formData.phoneCode;
  delete formData.phoneNum;

  if (!edit) {
    formData.profile_photo = formData.profile_photo[0]
      ? formData.profile_photo[0]
      : '';
  } else {
    if (typeof formData.profile_photo === 'string') formData.profile_photo = '';
    else
      formData.profile_photo = formData.profile_photo[0]
        ? formData.profile_photo[0]
        : '';
  }

  const formdata = new FormData();
  formdata.append(`phone`, phone);
  Object.keys(formData).forEach((data) => {
    if (data !== 'contacts' && data !== 'phone') {
      formdata.append(`${data}`, formData[data]);
    }
  });

  return formdata;
};
