import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [users, setUsersData] = useState([]);
  const umaxUrl = 'https://umaxxnew-1-d6861606.deta.app';

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get(`${umaxUrl}/user-by-id`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUsersData(response.data.Data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {users.map((user) => (
        <div key={user.id} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
              <img src={`data:image/png;base64, ${user.image}`} alt={user.email} className="object-cover w-full h-full" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Role: {user.role}</p>
              <p className="text-sm text-gray-500">Email: {user.email}</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex flex-row items-center gap-2 mb-2">
              <p className="text-sm text-gray-500">Currencies:</p>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg">{user.currency}</span>
            </div>
            <div className="flex flex-row items-center gap-2 mb-2">
              <p className="text-sm text-gray-500">Position Symbol:</p>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg">$</span>
            </div>
            <div className="flex flex-row items-center gap-2 mb-2">
              <p className="text-sm text-gray-500">Language:</p>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg">{user.language}</span>
            </div>
            <div className="flex flex-row items-center gap-2 mb-2">
              <p className="text-sm text-gray-500">Timezone:</p>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg">{user.timezone_name}</span>
            </div>
            <div className="flex flex-row items-center gap-2 mb-2">
              <p className="text-sm text-gray-500">Culture:</p>
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg">{user.culture}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Profile;
