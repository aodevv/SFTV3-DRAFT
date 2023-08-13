import { PhoneNumberUtil } from "google-libphonenumber";
const phoneUtil = PhoneNumberUtil.getInstance();

import { allCountryPhoneCodes } from "./objects";

let code, phoneObj, formattedNumber;

export const phoneFormatter = (phoneCode, phoneNum) => {
  try {
    if (phoneCode && phoneNum) {
      code = allCountryPhoneCodes[phoneCode];
      phoneObj = phoneUtil.parse(phoneNum, phoneCode);
      formattedNumber = phoneUtil.format(phoneObj, PhoneNumberUtil.NATIONAL);
      return `${code} ${formattedNumber}`;
    }
  } catch (error) {
    console.log(error);
    return "";
  }
};
