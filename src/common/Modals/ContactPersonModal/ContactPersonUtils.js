import * as Yup from 'yup';
import _ from 'lodash';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = () => {
  return Yup.object({
    person_clients: Yup.array()
      .of(
        Yup.object().shape({
          firstname: Yup.string().required('* Firstname is required'),
          lastname: Yup.string().required('* Lastname is required'),
          email: Yup.string()
            .email('* Email must be valid')
            .required('* Email is required'),
        })
      )
      .test('unique-emails', 'Emails must be unique', function (values) {
        // Check for duplicate emails in the contacts array
        const emails = values.map((contact) => contact.email);
        const uniqueEmails = new Set(emails);
        console.log(uniqueEmails, emails);
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

export const prepareInitialValues = (persons) => {
  const initialPersons = persons.map((person) => {
    const {
      id,
      first_name,
      last_name,
      profile_photo,
      picture,
      birthday,
      acronym,
      email,
    } = person;
    return {
      id,
      first_name,
      last_name,
      profile_photo: profile_photo ? profile_photo : '',
      picture: picture ? picture : [],
      birthday,
      acronym,
      email,
      phoneCode: person.phone?.split(' ')[0] ? person.phone?.split(' ')[0] : '',
      phoneNum: person.phone?.split(' ')[1] ? person.phone?.split(' ')[1] : '',
    };
  });

  return initialPersons;
};
