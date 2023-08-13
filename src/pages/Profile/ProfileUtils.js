import * as Yup from 'yup';
import _ from 'lodash';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const validationSchema = Yup.object({
  first_name: Yup.string().required('* First name is required'),
  last_name: Yup.string().required('* Last name is required'),

  phone: Yup.string(),
  // .matches(phoneRegExp, "* Phone number is not valid")
  // .required("* Phone number required"),
  email: Yup.string().required('* Email is required'),
});

export const initialValues = {
  first_name: '',
  last_name: '',
  acronym: '',
  role: '',
  profile_photo: [],
  phoneCode: '',
  phoneNum: '',
  email: '',
  native_langue_id: '',
  other_langue_id: '',
};

export const prepareFormData = (values) => {
  const data = { ...values };
  const formData = new FormData();
  const phone = `${values.phoneCode} ${values.phoneNum?.replace(/ /g, '')}`;
  data.profile_photo = data.profile_photo[0];
  data.phone = phone;
  delete data.phoneCode;
  delete data.phoneNum;

  Object.keys(data).forEach((key) => {
    if (key !== 'profile_photo') {
      formData.append(`${key}`, data[key]);
    }
  });

  formData.append(
    `profile_photo`,
    typeof values.profile_photo === 'string' ||
      values.profile_photo.length === 0
      ? ''
      : values.profile_photo[0]
  );
  for (var pair of formData.entries()) {
    console.log(pair[0] + ', ' + pair[1]);
  }

  return formData;
};

export const removeNull = (data) => {
  let cleanData = _.mapValues(data, (value) => {
    return value === null ? '' : value;
  });

  return cleanData;
};

export const setValuesAfterFetch = (values, formik) => {
  const cleanData = removeNull(values);
  if (values) {
    formik.setValues({
      first_name: cleanData.first_name,
      last_name: cleanData.last_name,
      role: cleanData.role.name,
      acronym: cleanData.acronym,
      birthday: cleanData.birthday,
      native_langue_id: cleanData.native_langue_id,
      other_langue_id: cleanData.other_langue_id,
      phoneCode: cleanData.phone ? cleanData.phone.split(' ')[0] : '',
      phoneNum: cleanData.phone ? cleanData.phone.split(' ')[1] : '',
      email: cleanData.email,
      profile_photo: cleanData.profile_photo ? cleanData.profile_photo : [],
      name: cleanData.name,
    });
  }
};
