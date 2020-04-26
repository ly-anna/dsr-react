import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik'


const initialValues = {
  friends: [
    {
      name: '',
      email: '',
    },
  ],
};

const App = () => (
  <div>
    <h1>Invite friends</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={values => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {() => (
      <Form>
        <div className="row">
          <div className="col">
            <Field name="name" type="text" />
          </div>
          <div className="col">
            <Field name="email" type="text" />
          </div>
          <div className="col">
            <button type="button">X</button>
          </div>
        </div>
        {/* <button type="button" disabled={isSubmitting} className="secondary">Add friend</button>
        <button type="submit" disabled={isSubmitting}>Invite</button> */}
      </Form>
      )}
    </Formik>
  </div>
)

export default App;
