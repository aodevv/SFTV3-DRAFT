/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { forgotPassword } from '../../../redux/authSlice/authSlice';
import AuthInput from '../../../common/@core/auth/AuthInput';
import Btn from '../../../common/@core/Btn/Btn';
import './LoginForm.scss';

const ResetPassword = () => {
  const [sent, setSent] = useState(false);
  const [done, setDone] = useState(false);

  const [timeRemaining, setTimeRemaining] = useState(30);
  const [emailHidden, setEmailHidden] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    }),
    onSubmit: (values) => {
      if (!loading) {
        setDone(true);
        dispatch(forgotPassword({ email: values.email }));
        setTimeRemaining(30);
      }
    },
  });

  const handleResend = () => {
    if (timeRemaining <= 0) {
      formik.handleSubmit();
    }
  };

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
    let timer;

    if (done && !error && !loading) {
      setSent(true);
      setEmailHidden(true);
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timer);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    return () => {
      setDone(false);
    };
  }, []);

  return (
    <div className="loginform">
      <form>
        <h1>Reset Password</h1>
        <h2>
          Enter the email associated with your account and we will send an email
          with instructions.
        </h2>

        {!emailHidden && (
          <AuthInput
            type="text"
            formikName="email"
            value={formik.values.email}
            handleChange={formik.handleChange}
            name="Enter your email address"
            error={formik.errors.email}
            handleBlur={formik.handleBlur}
            touched={formik.touched.email}
          />
        )}

        <Btn
          isLoading={loading}
          text="SEND"
          color="green"
          size="full"
          sent={emailHidden}
          confirmMsg="Email sent"
          clickHandler={formik.handleSubmit}
          type="button"
        />
        {sent && (
          <div className="loginform__resend">
            <p>Didn't receive the password link?</p>
            <p></p>
            <div className="resend-timer">
              <p
                onClick={handleResend}
                className={`blue-text ${timeRemaining > 0 && 'desactivated'}`}
              >
                Resend Now
              </p>
              {timeRemaining > 0 && <p>after {timeRemaining} seconds</p>}
            </div>
            <span>OR </span>
            <p onClick={() => setEmailHidden(false)} className="blue-text">
              Try another email
            </p>
          </div>
        )}

        {error && <span className="auth-error">{`* ${error}`}</span>}
      </form>
    </div>
  );
};

export default ResetPassword;
