export const setValuesAfterFetch = (userForm, user) => {
  userForm.setValues({
    date: user.updated_at,
    status: user.status,
    first_name: user.first_name,
    last_name: user.last_name,
    acronym: user.acronym,
    birthday: user.birthday,
    phoneCode: user.phone?.indexOf(' ') > -1 ? user.phone?.slice(0, 2) : '',
    phoneNum: user.phone?.indexOf(' ') > -1 ? user.phone?.slice(2) : user.phone,
    email: user.email,
    function_id: user.super_admin_function?.function?.id,
    new_fct: '',
    role_id: user.role?.id,
    profile_photo: user.profile_photo ? user.profile_photo : [],
  });
};
