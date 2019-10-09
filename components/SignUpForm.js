import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// /^[0]?[789]\d{9}$/

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),

  phone: Yup.string()
    .required('Please Enter your phone number')
    .test('regex', 'invalid phone number', val => {
      let regExp = new RegExp('^([0|+[0-9]{1,5})?([7-9][0-9]{9})$');
      // if (val.includes('+') && val.includes('+91')) {
      //   console.log(val);
      //   return regExp.test(val);
      // }
      return regExp.test(val);
    }),

  password: Yup.string()
    .required('Please Enter your password')
    .test(
      'regex',
      'Password must be min 6 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase',
      val => {
        let regExp = new RegExp(
          '^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$'
        );
        return regExp.test(val);
      }
    ),
  confirmPassword: Yup.string()
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const SignUpForm = () => (
  <div className="d-flex flex-column col-xs-12 col-sm-10 col-md-8 col-lg-6">
    <h2>Signup</h2>
    <Formik
      initialValues={{
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="d-flex flex-column">
          <div className="form-group">
            <label>Email</label>
            <Field name="email" type="email" className="form-control" />
            {errors.email && touched.email ? (
              <div className="small text-danger">{errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <Field
              name="phone"
              type="text"
              // maxLength="10"
              className="form-control"
            />
            {errors.phone && touched.phone ? (
              <div className="small text-danger">{errors.phone}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label>Password</label>
            <Field name="password" type="password" className="form-control" />
            {errors.password && touched.password ? (
              <div className="small text-danger">{errors.password}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label>confirmPassword</label>
            <Field
              name="confirmPassword"
              type="password"
              className="form-control"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="small text-danger">{errors.confirmPassword}</div>
            ) : null}
          </div>

          <button
            type="submit"
            className="btn btn-dark"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default SignUpForm;
