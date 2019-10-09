import { useContext } from 'react';
import UserContext from '../components/UserContext';
import { Formik } from 'formik';

const Form = () => {
  const { signIn } = useContext(UserContext);

  const authenticate = (username, password) => {
    signIn(username, password);
  };

  return (
    <div className="sign-in">
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          let errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const data = JSON.parse(JSON.stringify(values, null, 2));
            console.log(data);

            authenticate(data.email, data.password);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" className="btn" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>

      <style jsx>{`
        .sign-in {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fff;
          padding: 40px;
          margin: 0 auto;
          box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08),
            0 3px 3px 0 rgba(0, 0, 0, 0.12);
        }
        input {
          font-size: 18px;
          line-height: 1.8;
          padding: 8px 16px;
          display: block;
          width: 100%;
          min-width: 260px;
          background: #f3f3f3;
          border: 1px solid #eee;
          margin-bottom: 20px;
        }
        .message {
          color: red;
          font-size: 16px;
          max-width: 260px;
          text-align: center;
        }
        .btn {
          margin-top: 40px;
        }
      `}</style>
    </div>
  );
};

export default Form;
