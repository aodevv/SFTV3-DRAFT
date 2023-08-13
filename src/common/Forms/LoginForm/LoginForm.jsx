import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HiOutlineLockOpen } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";

import { loginJwt, clearError } from "../../../redux/authSlice/authSlice";
import AuthInput from "../../@core/auth/AuthInput";
import Btn from "../../@core/Btn/Btn";
import "./LoginForm.scss";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      username: Yup.string()
        .email("Please enter a valid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(loginJwt({ email: values.username, password: values.password }));
    },
  });

  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    dispatch(clearError());
    return () => {
      dispatch(clearError());
    };
  }, []);

  return (
    <div className="loginform">
      <form>
        <h1>Sign In</h1>
        <h2>Sign in to manage your account</h2>

        <AuthInput
          type="text"
          formikName="username"
          value={formik.values.username}
          handleChange={formik.handleChange}
          name="Enter your email address"
          handleBlur={formik.handleBlur}
          touched={formik.touched.username}
          error={formik.errors.username}
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
        {user.error && <span className="auth-error">{`* ${user.error}`}</span>}
      </form>
    </div>
  );
};

export default LoginForm;
