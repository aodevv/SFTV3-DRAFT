import React, { useState, useEffect } from "react";

import FormInput from "../../@core/FormInput/FormInput";
import FormTextarea from "../../@core/FormInput/FormTextarea";
import FormSelect from "../../@core/FormInput/FormSelect";
import FormPhoneSelect from "../../@core/FormInput/FormPhoneSelect";
import CountrySelect from "../../@core/FormInput/CountrySelect";

import "./SiteForm.scss";

const SiteForm = ({
  formik,
  error,
  edit,
  site,
  clientLogo,
  existingCountry,
}) => {
  useEffect(() => {
    const acm = formik.values.name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();

    if (edit) {
      if (formik.values.name !== site.name)
        formik.setFieldValue("acronym", acm);
    } else {
      formik.setFieldValue("acronym", acm);
    }
  }, [formik.values.name]);

  useEffect(() => {
    if (edit && formik.values.acronym === site.acronym) {
      formik.setFieldValue("acronym", site.acronym);
    }
  }, []);

  useEffect(() => {
    if (edit) {
      if (formik.values.country && formik.values.country !== existingCountry) {
        formik.setFieldValue("phoneCode", formik.values.country);
      }
    } else {
      formik.setFieldValue("phoneCode", formik.values.country);
    }
  }, [formik.values.country]);

  return (
    <>
      <div className="site-form">
        <div className="site-form__inputs">
          <div className="csform-title">
            <div className="client-name">
              <p className="client-name__label">Client name</p>
              <div className="client-name__box">
                <img src={clientLogo} alt="" />
              </div>
            </div>

            <FormInput
              label="Site name"
              placeholder="Enter Site name"
              name="name"
              type="text"
              value={formik.values.name}
              changeHandler={formik.handleChange}
              error={formik.errors.name}
              onBlur={formik.handleBlur}
              touched={formik.touched.name}
            />
            <FormInput
              label="Acronym"
              // placeholder="Enter acronym"
              name="acronym"
              type="text"
              // disabled={true}
              value={formik.values.acronym}
              changeHandler={(e) => {
                formik.setFieldValue("acronym", e.target.value);
              }}
            />
          </div>
          <div className="csform-legal">
            <FormInput
              label="Enter TVA"
              placeholder="Enter TVA"
              name="tva"
              type="text"
              value={formik.values.tva}
              changeHandler={formik.handleChange}
              error={formik.errors.tva}
              onBlur={formik.handleBlur}
              touched={formik.touched.tva}
            />
            <FormInput
              label="Nace"
              placeholder="Enter NACE"
              name="nace"
              type="text"
              value={formik.values.nace}
              changeHandler={formik.handleChange}
              error={formik.errors.nace}
              onBlur={formik.handleBlur}
              touched={formik.touched.nace}
            />
          </div>
          <div className="csform-desc">
            <FormTextarea
              label="Description"
              placeholder="Write a few sentences about the Contractor"
              name="desc"
              type="text"
              value={formik.values.desc}
              changeHandler={formik.handleChange}
              error={formik.errors.desc}
              onBlur={formik.handleBlur}
              touched={formik.touched.desc}
            />
          </div>
          <div className="csform-addr">
            <FormInput
              label="Address"
              placeholder="Enter address"
              name="address"
              type="text"
              value={formik.values.address}
              changeHandler={formik.handleChange}
              error={formik.errors.address}
              onBlur={formik.handleBlur}
              touched={formik.touched.address}
            />
            <FormInput
              label="N°"
              placeholder="Enter N°"
              name="n_address"
              type="text"
              value={formik.values.n_address}
              changeHandler={formik.handleChange}
              error={formik.errors.n_address}
              onBlur={formik.handleBlur}
              touched={formik.touched.n_address}
            />
            <FormInput
              label="Box"
              placeholder="Enter PO BOX"
              name="box"
              type="text"
              value={formik.values.box}
              changeHandler={formik.handleChange}
              error={formik.errors.box}
              onBlur={formik.handleBlur}
              touched={formik.touched.box}
            />
          </div>
          <div className="csform-addr2">
            <FormInput
              label="Zip code"
              placeholder="Enter Zip Code"
              name="zip_code"
              type="text"
              value={formik.values.zip_code}
              changeHandler={formik.handleChange}
              error={formik.errors.zip_code}
              onBlur={formik.handleBlur}
              touched={formik.touched.zip_code}
            />
            <FormInput
              label="City"
              placeholder="Enter City"
              name="city"
              type="text"
              value={formik.values.city}
              changeHandler={formik.handleChange}
              error={formik.errors.city}
              onBlur={formik.handleBlur}
              touched={formik.touched.city}
            />
            {/* <FormSelect
              label="Country"
              placeholder="Select a country"
              name="country"
              value={formik.values.country}
              options={countries}
              position="top"
              changeHandler={(value) =>
                formik.setFieldValue("country", value.value)
              }
              error={formik.errors.country}
              onBlur={formik.handleBlur}
              touched={formik.touched.country}
            /> */}
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
          <div className="csform-contact">
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
              placeholder="Enter Email"
              name="email"
              type="text"
              value={formik.values.email}
              changeHandler={formik.handleChange}
              error={formik.errors.email}
              onBlur={formik.handleBlur}
              touched={formik.touched.email}
            />
            <FormInput
              label="Website"
              placeholder="Enter website"
              name="website"
              type="text"
              value={formik.values.website}
              changeHandler={formik.handleChange}
              error={formik.errors.website}
              onBlur={formik.handleBlur}
              touched={formik.touched.website}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteForm;
