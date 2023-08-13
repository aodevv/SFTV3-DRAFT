import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newPassword } from '../../../redux/authSlice/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineLockOpen } from 'react-icons/hi';

import AuthInput from '../../../common/@core/auth/AuthInput';
import Btn from '../../../common/@core/Btn/Btn';
import './LoginForm.scss';

const ResetPassword = () => {
  const [sent, setSent] = useState(false);
  const [done, setDone] = useState(false);
  const { token } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const formik = useFormik({
    initialValues: {
      newPass: '',
      confirmPass: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      newPass: Yup.string()
        .min(8, 'Password must be 8 characters long')
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )
        .required('New password is required'),
      confirmPass: Yup.string()
        .required('Password confirmation is required')
        .oneOf([Yup.ref('newPass'), null], 'Passwords must match'),
    }),
    onSubmit: (values) => {
      if (!loading) {
        const { newPass, confirmPass } = values;
        setDone(true);
        dispatch(
          newPassword({
            password: newPass,
            passwordConfirmation: confirmPass,
            token,
          })
        );
      }

      //   dispatch(forgotPassword({ email: values.email }));
    },
  });

  useEffect(() => {
    if (user.token && user.report_type) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    if (error && done) {
      setDone(false);
    }
  }, [error]);

  useEffect(() => {
    if (done && !error && !loading) {
      setSent(true);
      setTimeout(() => {
        navigate('/');
      }, 10000);
    }
  }, [loading]);

  useEffect(() => {
    return () => {
      setDone(false);
    };
  }, []);

  return (
    <div className="loginform">
      <form>
        <h1>{sent ? 'Password confirmed!' : 'New Password'}</h1>
        <h2>
          {sent ? 'You are being redirected...' : 'Enter the new password.'}
        </h2>
        {!sent && (
          <>
            <AuthInput
              type="password"
              formikName="newPass"
              value={formik.values.newPass}
              handleChange={formik.handleChange}
              name="New password"
              icon={<HiOutlineLockOpen />}
              error={formik.errors.newPass}
              handleBlur={formik.handleBlur}
              touched={formik.touched.newPass}
              className="flexed"
            />
            <AuthInput
              type="password"
              formikName="confirmPass"
              value={formik.values.confirmPass}
              handleChange={formik.handleChange}
              name="Confirm new password"
              icon={<HiOutlineLockOpen />}
              error={formik.errors.confirmPass}
              handleBlur={formik.handleBlur}
              touched={formik.touched.confirmPass}
            />
          </>
        )}

        <Btn
          isLoading={loading}
          text="CONFIRM"
          color="green"
          size="full"
          sent={sent}
          confirmMsg="Confirmed"
          clickHandler={formik.handleSubmit}
          type="button"
        />

        {error && <span className="auth-error">{`* ${error}`}</span>}
      </form>
    </div>
  );
};

export default ResetPassword;
