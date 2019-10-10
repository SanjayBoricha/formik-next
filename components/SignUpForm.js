import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max';

Yup.addMethod(Yup.string, 'phone', function() {
  return this.test({
    name: 'phone',
    exclusive: true,
    message: 'Must be a mobile number',
    test: value => {
      try {
        const phoneNumber = parsePhoneNumberFromString(value, 'IN');

        console.log('getType()', phoneNumber.getType());
        console.log('isValid()', phoneNumber.isValid());

        return (
          phoneNumber.getType() === 'MOBILE' &&
          phoneNumber.isPossible() &&
          phoneNumber.isValid()
        );
      } catch (e) {
        return false;
      }
    }
  });
});

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),

  phone: Yup.string()
    .required('Please Enter your phone number')
    .phone('Hey, that number looks to be invalid'),

  password: Yup.string()
    .required('Please Enter your password')
    .test('regex', 'Password must contain lowercase characters', val => {
      let regExp = new RegExp('^(?=.*[a-z]).{1,}$');
      return regExp.test(val);
    })
    .test('regex', 'Password must contain Uppercase characters', val => {
      let regExp = new RegExp('^(?=.*[A-Z]).{1,}$');
      return regExp.test(val);
    })
    .test('regex', 'Password must contain numeric value', val => {
      let regExp = new RegExp('^(?=.*[0-9]).{1,}$');
      return regExp.test(val);
    })
    .test('regex', 'Password must contain special character', val => {
      let regExp = new RegExp('^(?=.*[!@#$%^&]).{1,}$');
      return regExp.test(val);
    }),
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
      onSubmit={(values, { setSubmitting }) => {
        // same shape as initial values
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ errors, touched, isSubmitting, handleChange, values }) => (
        <Form className="d-flex flex-column">
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              value={values.email}
              onChange={handleChange}
            />
            {errors.email && touched.email ? (
              <div className="small text-danger">{errors.email}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              name="phone"
              type="text"
              maxLength="10"
              className="form-control"
              value={values.phone}
              onChange={handleChange}
            />
            {errors.phone && touched.phone ? (
              <div className="small text-danger">{errors.phone}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={values.password}
              onChange={handleChange}
            />
            {errors.password && touched.password ? (
              <div className="small text-danger">{errors.password}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label>confirmPassword</label>
            <input
              name="confirmPassword"
              type="password"
              className="form-control"
              value={values.confirmPassword}
              onChange={handleChange}
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
