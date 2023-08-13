import React, { useState, useEffect } from "react";

import FormInput from "../../@core/FormInput/FormInput";
import FormImgSelect from "../../@core/FormImgSelect/FormImgSelect";
import { components } from "react-select";

import { RiDeleteBin5Line, RiDeleteBin6Line } from "react-icons/ri";

import DatePicker from "../../@core/DatePicker/DatePicker";
import FormSelect from "../../@core/FormInput/FormSelect";
import FormPhoneSelect from "../../@core/FormInput/FormPhoneSelect";
import AvatarDropzone from "../../Dropzones/AvatarDropzone/AvatarDropzone";

import avatar from "../../../assets/avatar.png";

import { languages } from "./tempOptions";

import "./WorkersForm.scss";
import { FaUser } from "react-icons/fa";

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

const WorkersForm = ({
  id,
  handleDelete,
  edit,
  formik,
  worker,
  companies,
  sites,
  report_type,
  languages,
  functions,
  departments,
  client,
}) => {
  const phoneCodeError = formik.errors?.workers?.[id]?.phoneCode;
  const phoneNumError = formik.errors?.workers?.[id]?.phoneNum;
  const phoneCodeTouched = formik.touched?.workers?.[id]?.phoneCode;
  const phoneNumTouched = formik.touched?.workers?.[id]?.phoneNum;

  console.log(companies);

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
    formik.setFieldValue(`workers.${id}.function`, value);
    setFunctionValue("");
    setFctOptions([...functions, newOption]);
  };

  const handleCreateDeptOption = (value) => {
    const newOption = { label: value, value: value };
    formik.setFieldValue(`workers.${id}.department`, value);
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

  const img = formik.values.workers[id].picture_url;

  useEffect(() => {
    if (
      (formik.values.workers[id].firstname, formik.values.workers[id].lastname)
    ) {
      const fname = formik.values.workers[id].firstname.toUpperCase();
      const lname = formik.values.workers[id].lastname.toUpperCase();

      formik.setFieldValue(
        `workers.${id}.acronym`,
        `${fname.charAt(0)}${lname.charAt(0)}${lname.charAt(lname.length - 1)}`
      );
    }
  }, [formik.values.workers[id].firstname, formik.values.workers[id].lastname]);

  useEffect(() => {
    if (edit) {
      handleCreateOption(formik.values.workers[0].function);
      handleCreateDeptOption(formik.values.workers[0].department);
    }
  }, []);

  return (
    <div className={`workers-form ${id !== 0 && "not-first"}`}>
      {id !== 0 && (
        <span onClick={() => handleDelete(id)} className="delete-form">
          <i>
            <RiDeleteBin6Line />
          </i>
        </span>
      )}

      {id !== 0 && (
        <div className="workers-form__divider">
          <div className="name">
            {" "}
            <i>
              <FaUser />
            </i>{" "}
            Worker {id + 1}
          </div>
          <div className="line" />
        </div>
      )}
      <AvatarDropzone
        files={formik.values.workers[id].picture}
        setFiles={(file) => formik.setFieldValue(`workers.${id}.picture`, file)}
        img={img}
      />

      <div className="workers-form__inputs">
        <div className="workers-form__inputs-info">
          <FormInput
            label="First name"
            placeholder="Enter first name"
            name={`workers.${id}.firstname`}
            type="text"
            value={formik.values.workers[id].firstname}
            changeHandler={formik.handleChange}
            error={formik.errors?.workers?.[id]?.firstname}
            touched={formik.touched?.workers?.[id]?.firstname}
            onBlur={formik.handleBlur}
          />
          <FormInput
            label="Last name"
            placeholder="Enter last name"
            name={`workers.${id}.lastname`}
            type="text"
            uppercase
            value={formik.values.workers[id].lastname}
            changeHandler={formik.handleChange}
            error={formik.errors?.workers?.[id]?.lastname}
            touched={formik.touched?.workers?.[id]?.lastname}
            onBlur={formik.handleBlur}
          />
          <FormInput
            label="Acronym"
            disabled={true}
            name={`workers.${id}.acronym`}
            type="text"
            value={formik.values.workers[id].acronym}
          />
          <div className="workers-form__datepicker">
            <p>Birthday</p>
            <DatePicker
              name={`workers.${id}.birthday`}
              value={formik.values.workers[id].birthday}
              error={formik.errors?.workers?.[id]?.birthday}
              onBlur={formik.handleBlur}
              setTouched={() =>
                formik.setFieldTouched(`workers.${id}.birthday`, true)
              }
              touched={formik.touched?.workers?.[id]?.birthday}
              changeHandler={(value) =>
                formik.setFieldValue(`workers.${id}.birthday`, value)
              }
            />
          </div>
        </div>
        <div className="workers-form__inputs-contact">
          <FormPhoneSelect
            label="Telephone number"
            placeholder="Enter telephone number"
            inputName={`workers.${id}.phoneNum`}
            selectName={`workers.${id}.phoneCode`}
            type="text"
            selectValue={formik.values.workers[id].phoneCode}
            inputValue={formik.values.workers[id].phoneNum}
            changeHandler={formik.handleChange}
            selectChangeHandler={(value) =>
              formik.setFieldValue(`workers.${id}.phoneCode`, value.code)
            }
            // position="top"
            errors={{ phoneCode: phoneCodeError, phoneNum: phoneNumError }}
            touched={{ phoneCode: phoneCodeTouched, phoneNum: phoneNumTouched }}
            onBlur={formik.handleBlur}
          />
          <FormInput
            label="Email"
            placeholder="Enter email"
            name={`workers.${id}.email`}
            type="email"
            value={formik.values.workers[id].email}
            changeHandler={formik.handleChange}
            error={formik.errors?.workers?.[id]?.email}
            onBlur={formik.handleBlur}
            touched={formik.touched?.workers?.[id]?.email}
          />
        </div>
        <div className="workers-form__inputs-company">
          <FormImgSelect
            label="Company"
            placeholder="Select company"
            name={`workers.${id}.contractor_id`}
            position="bottom"
            options={companies}
            // value={site}
            // changeHandler={setSite}
            value={formik.values.workers[id].contractor_id}
            changeHandler={(value) =>
              formik.setFieldValue(`workers.${id}.contractor_id`, value.value)
            }
            error={formik.errors?.workers?.[id]?.contractor_id}
            onBlur={formik.handleBlur}
            touched={formik.touched?.workers?.[id]?.contractor_id}
          />
          {client?.id === formik.values.workers[id].contractor_id && (
            <FormSelect
              label="Site"
              placeholder="Select site"
              name={`workers.${id}.site_id`}
              position="bottom"
              options={sites}
              value={formik.values.workers[id].site_id}
              changeHandler={(value) =>
                formik.setFieldValue(`workers.${id}.site_id`, value.value)
              }
              error={formik.errors?.workers?.[id]?.site_id}
              onBlur={formik.handleBlur}
              touched={formik.touched?.workers?.[id]?.site_id}
            />
          )}

          <FormSelect
            label="Function"
            placeholder="Select function"
            name={`workers.${id}.function`}
            position="bottom"
            options={fctOptions}
            inputValue={functionValue}
            handleCreateOption={handleCreateOption}
            onCreateOptionKeyDown={onCreateOptionKeyDown}
            onInputChange={handleInputChange}
            value={formik.values.workers[id].function}
            changeHandler={(value) =>
              formik.setFieldValue(`workers.${id}.function`, value.value)
            }
            error={formik.errors?.workers?.[id]?.function}
            onBlur={formik.handleBlur}
            touched={formik.touched?.workers?.[id]?.function}
            components={customComponents}
          />
        </div>
        <div className="workers-form__inputs-last">
          {client?.id === formik.values.workers[id].contractor_id && (
            <FormSelect
              label="Role"
              placeholder="Select role"
              name={`workers.${id}.role`}
              position="bottom"
              options={roles}
              value={formik.values.workers[id].role}
              changeHandler={(value) =>
                formik.setFieldValue(`workers.${id}.role`, value.value)
              }
              error={formik.errors?.workers?.[id]?.role}
              onBlur={formik.handleBlur}
              touched={formik.touched?.workers?.[id]?.role}
            />
          )}
          <FormSelect
            label="Department"
            placeholder="Select department"
            name={`workers.${id}.department`}
            position="top"
            options={deptOptions}
            inputValue={departmentValue}
            handleCreateOption={handleCreateDeptOption}
            onCreateOptionKeyDown={onCreateDeptOptionKeyDown}
            onInputChange={handleDeptInputChange}
            value={formik.values.workers[id].department}
            changeHandler={(value) =>
              formik.setFieldValue(`workers.${id}.department`, value.value)
            }
            error={formik.errors?.workers?.[id]?.department}
            onBlur={formik.handleBlur}
            touched={formik.touched?.workers?.[id]?.department}
          />
          <FormSelect
            label="Native language"
            placeholder="Select language"
            name={`workers.${id}.native_langue_id`}
            position="top"
            options={languages}
            value={parseInt(formik.values.workers[id].native_langue_id)}
            changeHandler={(value) =>
              formik.setFieldValue(
                `workers.${id}.native_langue_id`,
                value.value
              )
            }
            error={formik.errors?.workers?.[id]?.native_langue_id}
            onBlur={formik.handleBlur}
            touched={formik.touched?.workers?.[id]?.native_langue_id}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkersForm;
