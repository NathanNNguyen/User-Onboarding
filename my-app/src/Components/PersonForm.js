import React from 'react'
import { withFormik, Form, Field } from 'formik'

const PersonForm = ({ values }) => {
  console.log(values)
  return (
    <div>React Formik
      <Form>
        <Field type='name' name='username' placeholder='Username' />
        <Field type='password' name='password' placeholder='Password' />
        <Field type='email' name='email' placeholder='Email' />
        <label> Terms of services
          <Field type='checkbox' name='terms' checked={values.terms} />
        </label>
        <button>Submit!</button>
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
  }
})(PersonForm)

export default FormikPersonForm;