import { React, useEffect, useState } from "react";

import FormInput from "../../@core/FormInput/FormInput";
import FormTextarea from "../../@core/FormInput/FormTextarea";
import FormSelect from "../../@core/FormInput/FormSelect";
import FormPhoneSelect from "../../@core/FormInput/FormPhoneSelect";

//icons imports
import userIcon from "../../../assets/icons/userIcon.png";
import contactIcon from "../../../assets/icons/contactIcon.png";

//style import
import "./MyProfileForm.scss";
import CountrySelect from "../../@core/FormInput/CountrySelect";

const MyProfileForm = ({ formik, countries }) => {
  useEffect(() => {
    const acm = formik.values.name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();

    formik.setFieldValue("acronym", acm);
  }, [formik.values.name]);

  return (
    <div className="myprofile-form">
      <div className="myprofile-form-divider">
        <img src={userIcon} />
        <p>Professional information</p>
      </div>
      <div className="myprofile-form-inputs">
        <div className="form-title">
          <FormInput
            label="Client name"
            placeholder="Enter contractor name"
            name="name"
            type="text"
            value={formik.values.name}
            changeHandler={formik.handleChange}
            touched={formik.touched.name}
            error={formik.errors.name}
          />
          <FormInput
            label="Acronym"
            // placeholder="Enter acronym"
            name="acronym"
            type="text"
            disabled={true}
            value={formik.values.acronym}
          />
          <FormInput
            label="Legal Form"
            placeholder="Enter legal form"
            name="legal_form"
            position="bottom"
            value={formik.values.legal_form}
            changeHandler={formik.handleChange}
            touched={formik.touched.legal_form}
            error={formik.errors.legal_form}
          />
        </div>
        <div className="form-legal">
          <FormInput
            label="TVA"
            placeholder="Enter TVA"
            name="tva"
            type="text"
            value={formik.values.tva}
            changeHandler={formik.handleChange}
            touched={formik.touched.tva}
            error={formik.errors.tva}
          />
          <FormInput
            label="NACE"
            placeholder="Enter NACE"
            name="nace"
            type="text"
            value={formik.values.nace}
            changeHandler={formik.handleChange}
            touched={formik.touched.nace}
            error={formik.errors.nace}
          />
        </div>
        <div className="form-description">
          <FormTextarea
            label="Description"
            placeholder="Write a few sentences about the contractor..."
            name="desc"
            type="text"
            value={formik.values.desc}
            changeHandler={formik.handleChange}
            touched={formik.touched.desc}
            error={formik.errors.desc}
          />
        </div>
        <div className="form-address">
          <FormInput
            label="Address"
            placeholder="Enter contractor address"
            name="address"
            type="text"
            value={formik.values.address}
            changeHandler={formik.handleChange}
            touched={formik.touched.address}
            error={formik.errors.address}
          />
          <FormInput
            label="N°"
            placeholder="Enter N°"
            name="n_address"
            type="text"
            value={formik.values.n_address}
            changeHandler={formik.handleChange}
            touched={formik.touched.n_address}
            error={formik.errors.n_address}
          />
        </div>
        <div className="form-address2">
          <FormInput
            label="Box"
            placeholder="Enter PO box"
            name="box"
            type="text"
            value={formik.values.box}
            changeHandler={formik.handleChange}
            touched={formik.touched.box}
            error={formik.errors.box}
          />
          <FormInput
            label="Zip code"
            placeholder="Enter zip code"
            name="zip_code"
            type="text"
            value={formik.values.zip_code}
            changeHandler={formik.handleChange}
            touched={formik.touched.zip_code}
            error={formik.errors.zip_code}
          />
          <FormInput
            label="City"
            placeholder="Enter city"
            name="city"
            type="text"
            value={formik.values.city}
            changeHandler={formik.handleChange}
            touched={formik.touched.city}
            error={formik.errors.city}
          />

          <CountrySelect
            placeholder="Select Country"
            selectValue={formik.values.country}
            selectName="country"
            label="Country"
            position="top"
            error={formik.errors.country}
            touched={formik.touched.country}
            selectChangeHandler={(value) =>
              formik.setFieldValue("country", value.code)
            }
          />
        </div>
      </div>
      <div className="myprofile-form-divider">
        <img src={contactIcon} />
        <p className="form-divider-text">Contact information</p>
      </div>
      <div className="form-contact">
        <FormPhoneSelect
          label="Telephone number"
          placeholder="Enter telephone number"
          inputName="phoneNum"
          selectName="phoneCode"
          type="text"
          selectValue={formik.values.phoneCode}
          inputValue={formik.values.phoneNum}
          changeHandler={formik.handleChange}
          clearInput={() => formik.setFieldValue("phoneNum", "")}
          selectChangeHandler={(value) =>
            formik.setFieldValue("phoneCode", value.code)
          }
          position="top"
          errors={formik.errors}
          touched={formik.touched}
          onBlur={formik.handleBlur}
        />
        <FormInput
          label="Email"
          placeholder="Enter email"
          name="email"
          type="text"
          value={formik.values.email}
          changeHandler={formik.handleChange}
          touched={formik.touched.email}
          error={formik.errors.email}
        />
        <FormInput
          label="Website"
          placeholder="Enter website"
          name="website"
          type="text"
          value={formik.values.website}
          changeHandler={formik.handleChange}
          touched={formik.touched.website}
          error={formik.errors.website}
        />
      </div>
    </div>
  );
};

export default MyProfileForm;
