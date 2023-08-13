import React, { useEffect, useState } from "react";

//style import
import "./WorkerProfileForm.scss";

import { RiDeleteBin5Line } from "react-icons/ri";
import { components } from "react-select";

//icons imports
import userIcon from "../../../assets/icons/userIcon.png";
import contactIcon from "../../../assets/icons/contactIcon.png";
import professionalIcon from "../../../assets/icons/icon.svg";

import FormInput from "../../@core/FormInput/FormInput";
import DatePicker from "../../@core/DatePicker/DatePicker";
import FormSelect from "../../@core/FormInput/FormSelect";
import FormPhoneSelect from "../../@core/FormInput/FormPhoneSelect";
import { useSelector } from "react-redux";
import FormImgSelect from "../../@core/FormImgSelect/FormImgSelect";

const { Option } = components;

const RemoveableOption = (props) => {
  const { data } = props;
  const handleRemoveOption = () => {
    props.removeOption(props.data.value);
  };

  if (true) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Option {...props}>{props.children}</Option>
        <span
          style={{ padding: "0 10px", cursor: "pointer", display: "flex" }}
          onClick={handleRemoveOption}
        >
          <RiDeleteBin5Line />
        </span>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Option {...props}>{props.children}</Option>
      </div>
    );
  }
};

const roles = [
  { value: "worker", label: "Worker" },
  { value: "manager", label: "Manager" },
];

const WorkerProfileForm = ({
  formik,
  languages,
  departments,
  functions,
  sites,
  client,
  contractors,
}) => {
  const companies = [
    { value: formik.values.company, label: formik.values.company },
  ];

  const phoneCodeError = formik.errors?.phoneCode;
  const phoneNumError = formik.errors?.phoneNum;
  const phoneCodeTouched = formik.touched?.phoneCode;
  const phoneNumTouched = formik.touched?.phoneNum;

  const [functionValue, setFunctionValue] = useState("");
  const [fctOptions, setFctOptions] = useState(functions);

  const removeOption = (optionValue) => {
    setFctOptions((prevSelectOptions) =>
      prevSelectOptions.filter((option) => option.value !== optionValue)
    );
  };

  const customComponents = {
    Option: (props) => (
      <RemoveableOption {...props} removeOption={removeOption} />
    ),
  };

  const [departmentValue, setDepartmentValue] = useState("");
  const [deptOptions, setDeptOptions] = useState(departments);

  const handleInputChange = (value) => {
    setFunctionValue(value);
  };

  const handleDeptInputChange = (value) => {
    setDepartmentValue(value);
  };

  const handleCreateOption = (value) => {
    const newOption = { label: value, value: value, new: true };
    formik.setFieldValue(`function`, value);
    setFunctionValue("");
    setFctOptions([...functions, newOption]);
  };

  const handleCreateDeptOption = (value) => {
    const newOption = { label: value, value: value };
    formik.setFieldValue(`department`, value);
    setDepartmentValue("");
    setDeptOptions([...departments, newOption]);
  };

  const onCreateOptionKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCreateOption(functionValue);
    }
  };
  const onCreateDeptOptionKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCreateDeptOption(departmentValue);
    }
  };

  useEffect(() => {
    if ((formik.values.firstname, formik.values.lastname)) {
      const fname = formik.values.firstname.toUpperCase();
      const lname = formik.values.lastname.toUpperCase();

      formik.setFieldValue(
        `acronym`,
        `${fname.charAt(0)}${lname.charAt(0)}${lname.charAt(lname.length - 1)}`
      );
    }
  }, [formik.values.firstname, formik.values.lastname]);

  return (
    <div className="worker-profile-form">
      <div className="worker-profile-form-divider">
        <img src={userIcon} />
        <p className="form-divider-text">Personal information</p>
      </div>
      <div className="worker-personal-info">
        <div className="worker-name">
          <FormInput
            label="First Name"
            placeholder="Enter your first name"
            name="firstname"
            type="text"
            value={formik.values.firstname}
            changeHandler={formik.handleChange}
            touched={formik.touched.Firstname}
            error={formik.errors.firstname}
          />
          <FormInput
            label="Last Name"
            placeholder="Enter your last name"
            name="lastname"
            type="text"
            uppercase
            value={formik.values.lastname}
            changeHandler={formik.handleChange}
            touched={formik.touched.lastname}
            error={formik.errors.lastname}
          />
          <FormInput
            label="Acronym"
            disabled={true}
            name={`acronym`}
            type="text"
            value={formik.values.acronym}
          />
        </div>
        <div className="worker-info">
          <div className="worker-information-birthday">
            <p>Birthday</p>
            <DatePicker
              name={`birthday`}
              value={formik.values.birthday}
              error={formik.errors?.birthday}
              onBlur={formik.handleBlur}
              setTouched={() => formik.setFieldTouched(`birthday`, true)}
              touched={formik.touched?.birthday}
              changeHandler={(value) => formik.setFieldValue(`birthday`, value)}
            />
          </div>
          <FormSelect
            label="Native Language"
            placeholder="Enter your native language"
            name="native_langue_id"
            position="bottom"
            options={languages}
            value={parseInt(formik.values.native_langue_id)}
            changeHandler={(value) =>
              formik.setFieldValue("native_langue_id", value.value)
            }
            touched={formik.touched.native_langue_id}
            error={formik.errors.native_langue_id}
          />
          <FormSelect
            label="Other Languages"
            placeholder="Enter other languages"
            name="other_langue_id"
            options={languages}
            value={formik.values.other_langue_id}
            changeHandler={(value) =>
              formik.setFieldValue("other_langue_id", value.value)
            }
            touched={formik.touched.other_langue_id}
            error={formik.errors.other_langue_id}
          />
        </div>
      </div>
      <div className="worker-profile-form-divider">
        <img src={professionalIcon} />
        <p>Professional information</p>
      </div>
      <div className="worker-professional-info">
        <FormImgSelect
          label="Company"
          placeholder="Select company"
          name={`contractor_id`}
          position="bottom"
          options={contractors}
          // value={site}
          // changeHandler={setSite}
          value={formik.values.contractor_id}
          changeHandler={(value) =>
            formik.setFieldValue(`contractor_id`, value.value)
          }
          error={formik.errors?.contractor_id}
          onBlur={formik.handleBlur}
          touched={formik.touched?.contractor_id}
        />
        {client?.id === formik.values.contractor_id && (
          <FormSelect
            label="Site"
            placeholder="Select site"
            name={`site_id`}
            position="bottom"
            options={sites}
            value={formik.values.site_id}
            changeHandler={(value) =>
              formik.setFieldValue(`site_id`, value.value)
            }
            error={formik.errors?.site_id}
            onBlur={formik.handleBlur}
            touched={formik.touched?.site_id}
          />
        )}

        <FormSelect
          label="Department"
          placeholder="Select department"
          name={`department`}
          position="bottom"
          options={deptOptions}
          inputValue={departmentValue}
          handleCreateOption={handleCreateDeptOption}
          onCreateOptionKeyDown={onCreateDeptOptionKeyDown}
          onInputChange={handleDeptInputChange}
          value={formik.values.department}
          changeHandler={(value) =>
            formik.setFieldValue(`department`, value.value)
          }
          error={formik.errors?.department}
          onBlur={formik.handleBlur}
          touched={formik.touched?.department}
        />
      </div>
      <div className="worker-function">
        <FormSelect
          label="Function"
          placeholder="Select function"
          name={`function`}
          position="bottom"
          options={fctOptions}
          inputValue={functionValue}
          handleCreateOption={handleCreateOption}
          onCreateOptionKeyDown={onCreateOptionKeyDown}
          onInputChange={handleInputChange}
          value={formik.values.function}
          changeHandler={(value) =>
            formik.setFieldValue(`function`, value.value)
          }
          error={formik.errors?.function}
          onBlur={formik.handleBlur}
          touched={formik.touched?.function}
          components={customComponents}
        />
        {client?.id === formik.values.contractor_id && (
          <FormSelect
            label="Role"
            placeholder="Select role"
            name={`role`}
            position="bottom"
            options={roles}
            value={formik.values.role}
            changeHandler={(value) => formik.setFieldValue(`role`, value.value)}
            error={formik.errors?.role}
            onBlur={formik.handleBlur}
            touched={formik.touched?.role}
          />
        )}
      </div>
      <div className="worker-profile-form-divider">
        <img src={contactIcon} />
        <p className="form-divider-text">Contact information</p>
      </div>
      <div className="worker-contact-info">
        <FormPhoneSelect
          label="Telephone number"
          placeholder="Enter telephone number"
          inputName={`phoneNum`}
          selectName={`phoneCode`}
          type="text"
          selectValue={formik.values.phoneCode}
          inputValue={formik.values.phoneNum}
          changeHandler={formik.handleChange}
          selectChangeHandler={(value) =>
            formik.setFieldValue(`phoneCode`, value.code)
          }
          // position="top"
          errors={{ phoneCode: phoneCodeError, phoneNum: phoneNumError }}
          touched={{ phoneCode: phoneCodeTouched, phoneNum: phoneNumTouched }}
          onBlur={formik.handleBlur}
        />
        <FormInput
          label="Email"
          placeholder="Enter your email"
          name="email"
          value={formik.values.email}
          changeHandler={formik.handleChange}
          touched={formik.touched.email}
          error={formik.errors.email}
        />
      </div>
    </div>
  );
};

export default WorkerProfileForm;
