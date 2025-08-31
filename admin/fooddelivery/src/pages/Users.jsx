import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = ({ url }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(url + '/api/user/all');
      if (response.data.success) {
        setUsers(response.data.users);
      }
    };
    fetchUsers();
  }, [url]);

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee', padding: 32 }}>
      <h2 style={{ fontWeight: 600, fontSize: 28, marginBottom: 24 }}>Users & Spend</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
        <thead>
          <tr style={{ background: '#fafafa' }}>
            <th style={{ textAlign: 'left', padding: 12 }}>Name</th>
            <th style={{ textAlign: 'left', padding: 12 }}>Email</th>
            <th style={{ textAlign: 'left', padding: 12 }}>Total Spend (₹)</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 12 }}>{user.name}</td>
              <td style={{ padding: 12 }}>{user.email}</td>
              <td style={{ padding: 12, fontWeight: 500 }}>₹{user.totalSpend.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

