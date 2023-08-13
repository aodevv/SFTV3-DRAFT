import { HiOutlineLockOpen } from 'react-icons/hi';
import { ImSpinner2 } from 'react-icons/im';
import AuthInput from '../@core/auth/AuthInput';

import './styles.scss';

const PasswordReset = ({ formik, loader }) => {
  return (
    <div className="password-reset">
      <div className="password-reset__input">
        <AuthInput
          type="password"
          name="Your Password"
          formikName="password"
          value={formik.values.password}
          handleChange={formik.handleChange}
          placeholder="Enter your password"
          error={formik.errors.password}
          icon={<HiOutlineLockOpen />}
        />
      </div>

      <button
        type="button"
        onClick={formik.handleSubmit}
        className="password-reset__btn"
      >
        {loader ? (
          <i className="password-reset__btn__spinner">
            <ImSpinner2 />
          </i>
        ) : (
          'Reset Password'
        )}
      </button>
      <p className="password-reset__infos">
        *This will send a password reset email to the user.
      </p>
    </div>
  );
};

export default PasswordReset;
