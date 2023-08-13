import React from 'react';
import { ImSpinner2 } from 'react-icons/im';
import './FormControls.scss';

const FormControls = ({ edit, closeModal, disabled, loader }) => {
  return (
    <div className="form-controls">
      <button type="button" className="cancel" onClick={closeModal}>
        Cancel
      </button>
      {/* <button
        type="button"
        className="cancel"
        onClick={() => console.log(formik.errors)}
      >
        Log errors
      </button> */}
      <button
        type="submit"
        disabled={disabled || loader}
        className={`save ${edit && 'edit'} ${
          (disabled || loader) && 'disabled'
        }`}
      >
        {loader ? (
          <i className="spinner">
            <ImSpinner2 />
          </i>
        ) : edit ? (
          'Update & Save'
        ) : (
          'Save'
        )}
      </button>
    </div>
  );
};

export default FormControls;
