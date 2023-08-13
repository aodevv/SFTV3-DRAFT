import {React, useState} from "react"
import FormInput from "../../@core/FormInput/FormInput"

//style import
import "./PasswordForm.scss"

//icons imports
import hidePassword from "../../../assets/icons/hidePassword.png"
import showPassword from "../../../assets/icons/showPassword.png"

const PasswordForm = () => {
    const [OldPasswordShown, setOldPasswordShown] = useState(false);
    const toggleOldPassword = () => {
        setOldPasswordShown(!OldPasswordShown);
      };

      const [NewPasswordShown, setNewPasswordShown] = useState(false);
      const toggleNewPassword = () => {
          setNewPasswordShown(!NewPasswordShown);
        };
    return (
        <div className="password-form">
            <div className="form--input">
                <label>Old Password</label>
                <input
                    placeholder=""
                    name="password"
                    type={OldPasswordShown ? "text" : "password"} 
                />
                {OldPasswordShown ? <img src={showPassword} onClick={toggleOldPassword}/> : <img src={hidePassword} onClick={toggleOldPassword}/>}
            </div>
            <div className="form--input">
                <label>New Password</label>
                <input
                    placeholder=""
                    name="password"
                    type={NewPasswordShown ? "text" : "password"} 
                />
                {NewPasswordShown ? <img src={showPassword} onClick={toggleNewPassword}/> : <img src={hidePassword} onClick={toggleNewPassword}/>}
            </div>
            <FormInput
                label="Confirm Password"
                placeholder=""
                name="cpassword"
                type="password"
            />
            <button>Change Password</button>
        </div>
    )
}

export default PasswordForm