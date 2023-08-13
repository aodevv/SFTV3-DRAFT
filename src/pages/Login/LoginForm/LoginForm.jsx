import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLockOpen } from 'react-icons/hi';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { loginJwt, clearError } from '../../../redux/authSlice/authSlice';
import AuthInput from '../../../common/@core/auth/AuthInput';
import Btn from '../../../common/@core/Btn/Btn';
import './LoginForm.scss';

const LoginForm = ({ setToast }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      const fd = new FormData();
      for (const key in values) {
        fd.append(key, values[key]);
      }

      for (var pair of fd.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }
      await dispatch(clearError());
      dispatch(loginJwt(fd));
    },
  });

  useEffect(() => {
    if (user.token) {
      navigate('/');
    }
  }, [user]);

  useEffect(() => {
    dispatch(clearError());
    return () => {
      dispatch(clearError());
    };
  }, []);

  useEffect(() => {
    if (user.error) {
      setToast({
        text: user.error,
        type: 'error',
        show: true,
      });
    }
  }, [user.error]);

  return (
    <div className="loginform">
      <form>
        <h1>Sign In</h1>
        <h2>Sign in to manage your account</h2>

        <AuthInput
          type="text"
          formikName="email"
          value={formik.values.email}
          handleChange={formik.handleChange}
          name="Enter your email address"
          handleBlur={formik.handleBlur}
          touched={formik.touched.email}
          error={formik.errors.email}
        />

        <AuthInput
          type="password"
          formikName="password"
          value={formik.values.password}
          handleChange={formik.handleChange}
          name="Enter your password"
          action="Forgot password ?"
          // to="/reset-password"
          error={formik.errors.password}
          handleBlur={formik.handleBlur}
          touched={formik.touched.password}
          icon={<HiOutlineLockOpen />}
        />
        <Btn
          isLoading={user.loading}
          text="Login"
          color="green"
          size="full"
          sent={false}
          clickHandler={formik.handleSubmit}
          type="submit"
        />
      </form>
    </div>
  );
};

export default LoginForm;
