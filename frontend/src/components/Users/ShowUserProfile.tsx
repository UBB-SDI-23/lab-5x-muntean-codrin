import React, { useState, useEffect } from 'react';
import { BACKEND_API_URL } from '../../constants';
import { UserProfile } from '../../models/User';
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
  var { email } = useParams();
  const modifiedEmail = email ? email.replace(/,/g, '.') : ''; // Replace comma with dot if email is defined
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${BACKEND_API_URL}/UserProfile/${modifiedEmail}`);
        const data = await response.json();
        setUserProfile(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, [modifiedEmail]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userProfile) {
    return <p>User profile not found</p>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <p>
        <strong>First Name:</strong> {userProfile.firstName}
      </p>
      <p>
        <strong>Last Name:</strong> {userProfile.lastName}
      </p>
      <p>
        <strong>City:</strong> {userProfile.city}
      </p>
      <p>
        <strong>Gender:</strong> {userProfile.gender}
      </p>
      <p>
        <strong>Date of Birth:</strong> {userProfile.dateOfBirth}
      </p>
      <p>
        <strong>Entities Added:</strong> {userProfile.entititesAdded}
      </p>
    </div>
  );
};

export default UserProfilePage;
