import { Field, getIn } from "formik";

const ErrorMessage = ({ name }) => (
  <Field name={name}>
    {({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? error : null;
    }}
  </Field>
);

export default ErrorMessage;

// Usage
{
  /* <ErrorMessage name="friends[0].name" />; */
}
