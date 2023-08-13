import * as Yup from 'yup';
import _ from 'lodash';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const URL =
  /^((https?|ftp):\/\/)?(www.)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;

const vatRegex =
  /^(AT|BE|BG|CY|CZ|DE|DK|EE|EL|ES|FI|FR|GB|HR|HU|IE|IT|LT|LU|LV|MT|NL|PL|PT|RO|SE|SI|SK)[0-9A-Za-z.]{2,12}$/;
const naceRegex =
  /^([A-Z]|\d{2}|\d{2}\.\d{1}|\d{2}\.\d{2}|\d{2}\.\d{3}|\d{3}\.\d{1}|\d{3}\.\d{2}|\d{3}\.\d{3}|\d{4}\.\d{2}|\d{4}\.\d{3}|\d{5}\.\d{3})$/;

export const validationSchema = (usedEmails, initialEmail) => {
  return Yup.object({
    name: Yup.string().required('* Name is required'),
    // site_id: Yup.required("* Site is required"),
    // acronym: Yup.string().required("* Acronym is required"),
    // lf: Yup.string().required("* Legal form is required"),
    // tva: Yup.number().required("* TVA is required"),
    // nace: Yup.string().required("* NACE is required"),
    // desc: Yup.string().required("* Description is required"),
    // address: Yup.string().required("* Address is required"),
    tva: Yup.string().matches(vatRegex, '* TVA invalid eg. BE09999999XX'),
    nace: Yup.string().matches(naceRegex, '* NACE invalid'),
    // num: Yup.number().required("* Number is required"),
    // pobox: Yup.string().required("* PoBox is required"),
    // zip: Yup.number().required("* Zip is required"),
    // country: Yup.string().required("* Country is required"),
    // city: Yup.string().required("* City is required"),
    // phoneNum: Yup.string()
    //   .matches(phoneRegExp, '* Phone number is not valid')
    //   .required('* Phone number required'),
    // phoneCode: Yup.string().required('* Phone number incomplete'),
    email: Yup.string()
      .email('* Email must be valid')
      .test('unique', '* Email is already in use', (value) => {
        if (initialEmail === value) return true;
        else
          return !usedEmails
            ?.map((email) => email?.toLowerCase())
            ?.includes(value?.toLowerCase());
      })
      .required('* Email is required'),
    website: Yup.string().matches(URL, '* Website must be valid'),
    contacts: Yup.array()
      .of(
        Yup.object().shape({
          first_name: Yup.string().required('* Firstname is required'),
          last_name: Yup.string().required('* Lastname is required'),
          email: Yup.string()
            .email('* Email must be valid')
            .required('* Email is required'),
        })
      )
      .required('Must have one contact person')
      .test('unique-emails', 'Emails must be unique', function (values) {
        // Check for duplicate emails in the contacts array
        const emails = values.map((contact) => contact.email);
        const uniqueEmails = new Set(emails);
        if (emails.length !== uniqueEmails.size) {
          return this.createError({
            path: 'unique_email',
            message: '* Emails must be unique',
          });
        }
        return true;
      }),
  });
};

export const removeNulls = (obj) => {
  let clientValues = _.mapValues(obj, (value) => {
    return value === null ? '' : value;
  });

  const temp = clientValues.contacts;
  clientValues.contacts = temp?.map((contact) => {
    return _.mapValues(contact, (value) => {
      return value === null ? '' : value;
    });
  });
  let existingIds = clientValues.contacts?.map(
    (person_client) => person_client.id
  );
  const contacts = clientValues.contacts?.map((person_client) => {
    return {
      ...person_client,
      phoneCode: person_client.phone.split(' ')[0],
      phoneNum: person_client.phone.split(' ')[1],
    };
  });
  clientValues.contacts = contacts;
  return [clientValues, existingIds];
};

export const prepareInitialValues = (clientValues, edit) => {
  if (edit) {
    return {
      ...clientValues,
      phoneCode: clientValues.phone?.split(' ')[0]
        ? clientValues.phone?.split(' ')[0]
        : '',
      phoneNum: clientValues.phone?.split(' ')[1]
        ? clientValues.phone?.split(' ')[1]
        : '',
      logo: clientValues.logo ? clientValues.logo : [],
    };
  } else {
    return {
      name: '',
      logo: [],
      site_id: '',
      acronym: '',
      legal_form: '',
      tva: '',
      nace: '',
      desc: '',
      address: '',
      n_address: '',
      box: '',
      zip_code: '',
      city: '',
      country: '',
      phoneCode: '',
      phoneNum: '',
      email: '',
      website: '',
      contacts: [
        // {
        //   first_name: '',
        //   last_name: '',
        //   profile_photo: '',
        //   acronym: '',
        //   birthday: '',
        //   phoneCode: '',
        //   phone: '',
        //   email: '',
        // },
      ],
    };
  }
};

export const prepareFormData = ({ values, deletedIds, existingIds, edit }) => {
  const formData = { ...values };
  let splitted = [];
  let cleanNum = formData.phoneNum;
  if (formData.phoneNum.includes('+')) {
    splitted = formData.phoneNum.split(' ');
    if (splitted.length > 0) {
      if (splitted[0].includes('+')) {
        splitted.shift();
        const joined = splitted.join(' ');
        cleanNum = joined;
      }
    }
  }
  const phone = `${formData.phoneCode} ${cleanNum?.replace(/ /g, '')}`;
  delete formData.phoneCode;
  delete formData.phoneNum;

  const newContacts = formData.contacts.map((contact) => {
    const copy = { ...contact };
    const phone = `${copy.phoneCode} ${copy.phoneNum?.replace(/ /g, '')}`;
    delete copy.phoneCode;
    delete copy.phoneNum;
    return { ...copy, phone };
  });

  console.log('before:', formData);

  formData.contacts = newContacts;
  if (!edit) {
    formData.logo = formData.logo[0] ? formData.logo[0] : '';
  } else {
    if (typeof formData.logo === 'string') formData.logo = '';
    else formData.logo = formData.logo[0] ? formData.logo[0] : '';
  }
  console.log('after:', formData);

  const formdata = new FormData();

  Object.keys(formData).forEach((data) => {
    if (data !== 'contacts' && data !== 'phone') {
      formdata.append(`client[${data}]`, formData[data]);
    }
  });
  formdata.append(`client[phone]`, phone);
  // for (var pair of formdata.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }
  deletedIds.forEach((delId) => {
    const { id, formId } = delId;
    formdata.append(`contacts[${formId}][deleted_id]`, id);
  });

  formdata.append('client[description]', formData.desc);

  formData.contacts.forEach((contact, index) => {
    if (edit) {
      if (
        existingIds.includes(contact.id) &&
        !deletedIds.includes(contact.id)
      ) {
        formdata.append(`contacts[${index}][id]`, contact.id);
      } else {
        formdata.append(`contacts[${index}][id]`, '');
      }
      if (
        contact.profile_photo?.length > 0 &&
        typeof contact.profile_photo !== 'string'
      ) {
        formdata.append(
          `contacts[${index}][profile_photo]`,
          contact.profile_photo[0]
        );
      }
    } else if (contact.profile_photo?.length > 0) {
      console.log(typeof contact.profile_photo[0]);
      formdata.append(
        `contacts[${index}][profile_photo]`,
        contact.profile_photo[0]
      );
    }

    formdata.append(`contacts[${index}][first_name]`, contact.first_name);
    formdata.append(`contacts[${index}][last_name]`, contact.last_name);
    formdata.append(`contacts[${index}][acronym]`, contact.acronym);
    formdata.append(`contacts[${index}][phone]`, contact.phone || '');
    formdata.append(`contacts[${index}][email]`, contact.email);
    formdata.append(`contacts[${index}][birthday]`, contact.birthday);
  });

  return formdata;
};
