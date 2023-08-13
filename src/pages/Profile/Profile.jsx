import { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { ImSpinner2 } from 'react-icons/im';

import {
  clearProfileError,
  updateProfile,
} from '../../redux/profileSlice/profileSlice';
import {
  prepareFormData,
  validationSchema,
  initialValues,
  setValuesAfterFetch,
} from './ProfileUtils';
import AvatarDropzone from '@common/Dropzones/AvatarDropzone/AvatarDropzone';
import ProfileForm from '@common/Forms/ProfileForm/ProfileForm';
import PasswordReset from '@common/PasswordChange/PasswordChange';
import ToastContext from '@common/Contexts/ToastContext';

import './Profile.scss';

const Profile = () => {
  const toast = useContext(ToastContext);
  const [languagesState, setLanguagesState] = useState([]);
  const [profileImg, setprofileImg] = useState('');
  const dispatch = useDispatch();

  const { editing, error, languages, loading, infos } = useSelector(
    (state) => state.profile
  );

  const [done, setDone] = useState(false);
  // const [passDone, setPassDone] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setDone(false);
      const formData = prepareFormData(values);
      setDone(true);
      dispatch(updateProfile(formData));
    },
  });

  useEffect(() => {
    if (infos) {
      setValuesAfterFetch(infos, formik);
      setprofileImg(infos.profile_photo);
    }
  }, [infos]);

  useEffect(() => {
    if (languages.length > 0)
      setLanguagesState(
        languages.map((ln) => ({ value: ln.id, label: ln.name }))
      );
  }, [languages]);

  useEffect(() => {
    if (error) {
      setDone(false);
      toast.showErrorToast(error);
      setTimeout(() => {
        dispatch(clearProfileError());
      }, 100);
    }
  }, [error]);

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="my-profile">
          {loading && <h1 style={{ textAlign: 'center' }}>Loading ...</h1>}
          {!loading && infos && (
            <form onSubmit={formik.handleSubmit}>
              <div className="profile-form-side">
                <div className="myprofile-titles">
                  <AvatarDropzone
                    img={profileImg}
                    files={formik.values.profile_photo}
                    setFiles={(file) =>
                      formik.setFieldValue(`profile_photo`, file)
                    }
                    contain
                    profile
                  />
                </div>
                <div className="my-profile-form">
                  <ProfileForm formik={formik} languages={languagesState} />
                </div>
              </div>
              <div className="my-profile-footer">
                <p style={{ cursor: 'pointer' }}>User Profile</p>
                <button type="submit">
                  {editing ? (
                    <i className="my-profile-footer__spinner">
                      <ImSpinner2 />
                    </i>
                  ) : (
                    'Save'
                  )}
                </button>
                {/* <button type="submit">Save</button> */}
              </div>
            </form>
          )}
        </div>
        <PasswordReset
          updatingPass={null}
          setPassDone={() => console.log('first')}
        />
      </div>
    </div>
  );
};

export default Profile;
