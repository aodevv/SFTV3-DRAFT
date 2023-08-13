import { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Yup from 'yup';

import AvatarDropzone from '@common/Dropzones/AvatarDropzone/AvatarDropzone';
import PasswordResetForm from '../../common/PasswordResetForm';

import './UserProfile.scss';
import UserProfileForm from './UserProfileForm/UserProfileForm';
import {
  clearUser,
  clearUserError,
  editUser,
} from '../../redux/userSlice/userSlice';
import { fetchUserById } from '../../redux/userSlice/userSlice';
import {
  prepareFormData,
  prepareInitialValues,
  removeNulls,
  validationSchema,
} from '../Users/components/UserModal/user.utils';
import { fetchRoles } from '../../redux/rolesSlice/rolesSlice';
import { fetchFunctions } from '../../redux/functionSlice/functionSlice';
import { setValuesAfterFetch } from './UserProfileForm/UserProfile.utils';
import ToastContext from '@common/Contexts/ToastContext';
import { ImSpinner2 } from 'react-icons/im';

const UserProfile = () => {
  const toast = useContext(ToastContext);
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  let { userId } = useParams();

  const [roles, setRoles] = useState([]);
  const fct = useSelector((state) => state.function);
  const [functions, setFunctions] = useState(
    fct.functions.map((el) => ({
      label: el.name,
      value: el.id,
    }))
  );
  const role = useSelector((state) => state.role);

  const initialValues = prepareInitialValues(undefined, false);
  const activeUser = useSelector((state) => state.user.userProfile);
  const loading = useSelector((state) => state.user.loading);
  const posting = useSelector((state) => state.user.posting);
  const error = useSelector((state) => state.user.error);

  const userForm = useFormik({
    initialValues,
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setShouldRefetch(false);
      const formData = prepareFormData({ values, edit: true });
      for (var pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      dispatch(editUser({ id: activeUser.id, data: formData }));
      setDone(true);
    },
  });
  useEffect(() => {
    if (activeUser && functions.length > 0 && roles.length > 0) {
      const user = removeNulls(activeUser);
      setValuesAfterFetch(userForm, user);
    }
  }, [activeUser, fct.fetched, roles]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, []);

  useEffect(() => {
    if (shouldRefetch) {
      dispatch(fetchUserById(userId));
    }
  }, [shouldRefetch]);

  useEffect(() => {
    if (!fct.fetched) {
      dispatch(fetchFunctions());
    }
  }, [fct.fetched]);

  const [existingFunction, setExistingFunction] = useState(null);

  useEffect(() => {
    const functionsToAdd = fct.functions
      .filter((el) => !el.hidden)
      .map((el) => ({
        label: el.name,
        value: el.id,
      }));
    if (existingFunction) {
      const findFunction = fct.functions.find(
        (el) => el.id === existingFunction
      );
      if (findFunction) {
        const alreadyExisting = functionsToAdd.find(
          (el) => el.value === findFunction.id
        );
        if (!alreadyExisting) {
          functionsToAdd.push({
            label: findFunction.name,
            value: findFunction.id,
          });
        }
      }
    }
    setFunctions(functionsToAdd);
  }, [fct.functions, existingFunction]);

  useEffect(() => {
    if (!role.rolesFetched) {
      dispatch(fetchRoles());
    } else {
      setRoles(
        role.roles.map((el) => ({
          label: el.name,
          value: el.id,
        }))
      );
    }
  }, [role.rolesFetched]);

  useEffect(() => {
    return () => {
      dispatch(clearUser());
    };
  }, []);

  const passwordResetForm = useFormik({
    initialValues: {
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      password: Yup.string().required('* Your password is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (!posting && done && !error) {
      toast.showSuccessToast('User updated successfully');
      setShouldRefetch(true);
    }
  }, [posting, done, error]);

  useEffect(() => {
    if (error) {
      setDone(false);
      toast.showErrorToast(error);
      setTimeout(() => {
        dispatch(clearUserError());
      }, 100);
    }
  }, [error]);

  return (
    <div className="user-profile">
      <div className="user-profile__form">
        {loading && <h1>Loading ...</h1>}
        {!loading && activeUser && (
          <form>
            <div className="user-profile__form-img">
              <AvatarDropzone
                img={activeUser?.profile_photo || ''}
                files={userForm.values.profile_photo}
                setFiles={(file) =>
                  userForm.setFieldValue(`profile_photo`, file)
                }
              />
            </div>
            <div className="user-profile__form-inputs">
              <UserProfileForm
                roles={roles}
                functions={functions}
                formik={userForm}
                activeUser={activeUser}
                setExistingFunction={setExistingFunction}
              />
            </div>
          </form>
        )}

        <div className="user-profile__form-footer">
          <p>User Profile</p>
          <button type="button" onClick={userForm.handleSubmit}>
            {posting ? (
              <i className="user-profile__spinner">
                <ImSpinner2 />
              </i>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>

      <div className="user-profile__password-form">
        <PasswordResetForm formik={passwordResetForm} loader={false} />
      </div>
    </div>
  );
};

export default UserProfile;
