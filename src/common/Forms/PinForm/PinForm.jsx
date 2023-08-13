import React from "react";

import { useFormik } from "formik";

import userIcon from "../../../assets/icons/userIcon.png";
import FormInput from "../../@core/FormInput/FormInput";
import AuthInput from "../../@core/auth/AuthInput";

import "./PinForm.scss";
import { HiOutlineLockOpen } from "react-icons/hi";

const PinForm = ({ formik }) => {
  return (
    <div className="pin-form">
      <div className="pin-form-divider">
        <img src={userIcon} />
        <p className="form-divider-text">Personal information</p>
      </div>
      <div className="pin-info">
        <div className="pin-grid">
          <AuthInput
            type="password"
            name="Current PIN Code"
            formikName="oldCode"
            value={formik.values.oldCode}
            handleChange={formik.handleChange}
            placeholder=""
            error={formik.errors.oldCode}
            icon={<HiOutlineLockOpen />}
            onBlur={formik.handleBlur}
            touched={formik.errors.oldCode}
          />
          <AuthInput
            type="password"
            name="New PIN Code"
            formikName="newCode"
            value={formik.values.newCode}
            handleChange={formik.handleChange}
            placeholder=""
            error={formik.errors.newCode}
            icon={<HiOutlineLockOpen />}
            onBlur={formik.handleBlur}
            touched={formik.errors.newCode}
          />
          <AuthInput
            type="password"
            name="Confirm PIN Code"
            formikName="confirmCode"
            value={formik.values.confirmCode}
            handleChange={formik.handleChange}
            placeholder=""
            error={formik.errors.confirmCode}
            icon={<HiOutlineLockOpen />}
            onBlur={formik.handleBlur}
            touched={formik.errors.confirmCode}
          />
        </div>
      </div>
    </div>
  );
};

export default PinForm;
