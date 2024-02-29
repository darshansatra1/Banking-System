import React from 'react';

const UserListView = ({ user_name, email, balance, account_id }) => {
    const onClick = async()=>{

    }
  return (
    <div className="user-card" onClick={onClick}>
      <h2>{user_name}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Balance:</strong> ${balance}</p>
      <p><strong>Account ID:</strong> {account_id}</p>
    </div>
  );
};

export default UserListView;