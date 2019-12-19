import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const PersonForm = ({ values, errors, touched, status }) => {
  // console.log(values);
  // console.log(errors);
  // console.log(touched);

  const [person, setPerson] = useState([]);

  // added useEffect in order to see the changes happening after we submit the form
  useEffect(() => {
    console.log(`status has been updated`, status);

    // rendering the data we got after the form was submitted
    status && setPerson(person => [...person, status]);
  }, [status])
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
        <label> Terms and conditions
          <Field type='checkbox' name='terms' checked={values.terms} />
        </label>
        <button type='submit'>Submit!</button>
      </Form>

      {/* adding structure in order to save the data users are putting in */}
      {person.map(e => {
        return <ul key={e.name}>
          <li>Name: {e.username}</li>
          <li>Password: {e.password}</li>
          <li>Email: {e.email}</li>
        </ul>
      })}

    </div>
  )
}

// Formik syntax to wrap around components
const FormikPersonForm = withFormik({
  mapPropsToValues({ username, password, email, terms }) {
    // desconstructor props into username, password, email, terms for dry code
    // console.log(props)
    return {
      // Getting the intitial states for these keys values from App.js, if there is none, we can set one up to whichever we want with the 'string' quotation
      username: username || '',
      password: password || '',
      email: email || '',
      terms: terms || false
    };
  },

  //Validation syntax from YUP
  validationSchema: Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
    email: Yup.string().email().required(),
    terms: Yup.boolean().oneOf([true], `Must accept Terms and Conditions`)
  }),

  async handleSubmit(values, { setStatus }) {
    console.log(`SUBMITTINGGGG`, values);

    try {
      const res = await axios.post(`https://reqres.in/api/users`, values);
      console.log(`Success!!!`, res);
      setStatus(res.data);
    }
    catch (err) {
      console.log(err)
    }
  }
})(PersonForm);

export default FormikPersonForm;