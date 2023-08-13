import React, { useState } from "react";
import { HiOutlineLockOpen } from "react-icons/hi";
import AuthInput from "../@core/auth/AuthInput";

import * as Yup from "yup";

import { useDispatch } from "react-redux";
import { updatePassword } from "../../redux/profileSlice/profileSlice";

import { useFormik } from "formik";

import "./PasswordChange.scss";
import { ImSpinner2 } from "react-icons/im";

const PasswordReset = ({ setPassDone, updatingPass }) => {
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState("");

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      oldPass: "",
      newPass: "",
      confirmPass: "",
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      oldPass: Yup.string().required("* Old password is required"),
      newPass: Yup.string()
        .min(8, "* Password must be 8 characters long")
        .required("* New password is required"),
      confirmPass: Yup.string()
        .required("* Password confirmation is required")
        .oneOf([Yup.ref("newPass"), null], "* Passwords must match"),
    }),
    // validationSchema: validationSchema(contractorsEmails, initialEmail),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      setPassDone(true);

      dispatch(updatePassword({ ...values }));
    },
  });

  return (
    <div className="password-change">
      <form onSubmit={formik.handleSubmit}>
        <div className="password-change__input">
          <AuthInput
            type="password"
            name="Your Password"
            formikName="oldPass"
            value={formik.values.oldPass}
            handleChange={formik.handleChange}
            placeholder=""
            to="#"
            error={formik.errors.oldPass}
            icon={<HiOutlineLockOpen />}
            onBlur={formik.handleBlur}
            touched={formik.errors.oldPass}
          />
        </div>
        <div className="password-change__input">
          <AuthInput
            type="password"
            name="New Password"
            formikName="newPass"
            value={formik.values.newPass}
            handleChange={formik.handleChange}
            placeholder=""
            to="#"
            error={formik.errors.newPass}
            icon={<HiOutlineLockOpen />}
            onBlur={formik.handleBlur}
            touched={formik.errors.newPass}
          />
        </div>
        <div className="password-change__input">
          <AuthInput
            type="password"
            name="Confirm Password"
            formikName="confirmPass"
            value={formik.values.confirmPass}
            handleChange={formik.handleChange}
            placeholder=""
            to="#"
            error={formik.errors.confirmPass}
            icon={<HiOutlineLockOpen />}
            onBlur={formik.handleBlur}
            touched={formik.errors.confirmPass}
          />
        </div>
        <button type="submit" className="password-change__btn">
          {updatingPass ? (
            <i className="password-change__btn__spinner">
              <ImSpinner2 />
            </i>
          ) : (
            "Change Password"
          )}
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
