import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Person from './Person.js';

const PersonForm = ({ values, errors, touched, status }) => {
  // console.log(values);
  // console.log(errors);
  // console.log(touched);

  const [persons, setPersons] = useState([]);

  // added useEffect in order to see the changes happening after we submit the form
  useEffect(() => {
    // console.log(`status has been updated`, status);
    // rendering the data we got after the form was submitted
    status && setPersons(persons => [...persons, status]);
  }, [status])
  return (
    <div className='style'>React Formik
      <Form className='column'>
        <Field id='name' type='name' name='username' placeholder='Username' />
        <ErrorMessage name="username" />  {/* Better syntax for error messages */}

        {/* {touched.username && errors.username && (                       //Validation syntax from YUP
          <p>*{errors.username}</p>
        )} */}

        <Field id='password' type='password' name='password' placeholder='Password' />
        <ErrorMessage name="password" />

        <Field id='email' type='email' name='email' placeholder='Email' />
        <ErrorMessage name="email" />

        <Field as='select' id='role' name='role'>
          <option disabled>Choose a role</option>
          <option value='UI-Dev'>UI Dev</option>
          <option value='UX-Dev'>UX Dev</option>
          <option value='ReactI-Dev'>React I Dev</option>
          <option value='ReactII-Dev'>React II Dev</option>
          <option value='Backend-Dev'>Backend Dev</option>
        </Field>
        <ErrorMessage name="role" />

        <label> Terms and conditions
          <Field type='checkbox' name='terms' checked={values.terms} />
          <ErrorMessage name="terms" />

        </label>
        <button type='submit'>Submit!</button>
      </Form>

      {/* adding structure in order to save the data users are putting in */}
      {persons.map(person => {
        return <Person key={person.id} username={person.username} email={person.email} role={person.role} />
      })}
    </div>
  );
};

// Formik syntax to wrap around components
const FormikPersonForm = withFormik({
  mapPropsToValues({ username, password, email, role, terms }) {
    // desconstructor props into username, password, email, terms for dry code
    // console.log(props)
    return {
      // Getting the intitial states for these keys values from App.js, if there is none, we can set one up to whichever we want with the 'string' quotation
      username: username || '',
      password: password || '',
      email: email || '',
      role: role || 'Choose a role',
      terms: terms || false
    };
  },

  //Validation syntax from YUP
  validationSchema: Yup.object().shape({
    username: Yup.string().min(6).required(),
    password: Yup.string().min(4).required(),
    email: Yup.string().email().required(),
    role: Yup.string().oneOf(['UI-Dev', 'UX-Dev', 'React-I-Dev', 'React-II-Dev', 'Backend-Dev']).required(),
    terms: Yup.boolean().oneOf([true], `Must accept Terms and Conditions`)
  }),

  // setStatus so that we can store the data users are putting in
  async handleSubmit(values, { setStatus, resetForm }) {
    console.log(`SUBMITTINGGGG`, values);

    try {
      const res = await axios.post(`https://reqres.in/api/users`, values);
      console.log(`Success!!!`, res);
      if (res.data.email === `waffle@syrup.com`) {
        alert`waffle@syrup.com is already taken`
      }
      else {
        setStatus(res.data);
        resetForm();
      }
    }
    catch (err) {
      console.log(err)
    }
  }
})(PersonForm);

export default FormikPersonForm;