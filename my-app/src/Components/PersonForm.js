import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const PersonForm = ({ values, errors, touched }) => {
  console.log(values);
  console.log(errors);
  console.log(touched);
  return (
    <div>React Formik
      <Form>
        <Field type='name' name='username' placeholder='Username' />
        {touched.username && errors.username && (
          <p>*{errors.username}</p>
        )}
        <Field type='password' name='password' placeholder='Password' />
        {touched.password && errors.password && (
          <p>*{errors.password}</p>
        )}
        <Field type='email' name='email' placeholder='Email' />
        {touched.email && errors.email && (
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

const FormikPersonForm = withFormik({
  mapPropsToValues(props) {
    return {
      username: props.username || '',
      password: props.password || '',
      email: props.email || '',
      terms: props.terms || false
    };
  },
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