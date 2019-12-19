import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const PersonForm = ({ values, errors, touched }) => {
  // console.log(values);
  // console.log(errors);
  // console.log(touched);
  return (
    <div>React Formik
      <Form>
        <Field type='name' name='username' placeholder='Username' />
        {touched.username && errors.username && (                       //Validation syntax from YUP
          <p>*{errors.username}</p>
        )}
        <Field type='password' name='password' placeholder='Password' />
        {touched.password && errors.password && (                       //Validation syntax from YUP
          <p>*{errors.password}</p>
        )}
        <Field type='email' name='email' placeholder='Email' />
        {touched.email && errors.email && (                             //Validation syntax from YUP
          <p>*{errors.email}</p>
        )}
        <label> Terms of services
          <Field type='checkbox' name='terms' checked={values.terms} />
        </label>
        <button type='submit'>Submit!</button>
      </Form>
    </div>
  )
}

// Formik syntax to wrap around components
const FormikPersonForm = withFormik({
  mapPropsToValues(props) {
    return {

      // Getting the intitial states for these keys values from App.js, if there is none, we can set one up to whichever we want with the 'string' quotation
      username: props.username || '',
      password: props.password || '',
      email: props.email || '',
      terms: props.terms || false
    };
  },

  //Validation syntax from YUP
  validationSchema: Yup.object().shape({
    username: Yup.string().required(`Give me your name`),
    password: Yup.string().required(`Give me your password`),
    email: Yup.string().required(`Give me your email`)
  }),

  async handleSubmit(values, formikBag) {
    console.log(`SUBMITTINGGGG`, values);

    try {
      const res = await axios.post(`https://reqres.in/api/users`, values);
      console.log(`Success!!!`, res)
    }
    catch (err) {
      console.log(err)
    }
  }
})(PersonForm);

export default FormikPersonForm;