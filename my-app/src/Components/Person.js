import React from 'react';

const Person = ({ username, email, role }) => {
  return (
    <div>
      <p>Name: {username}</p>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </div>
  )
}

export default Person;