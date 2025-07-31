import React, { useEffect } from "react";
import NamePhoneSection from "../components/Profile/NamePhoneSection/NamePhoneSection";
import EmailOTPSection from "../components/Profile/EmailOTPSection/EmailOTPSection";
import AddressSection from "../components/Profile/AddressSection/AddressSection";
import PasswordSection from "../components/Profile/PasswordSection/PasswordSection";
import "../styles/pages/Profile.scss";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { user, fetchUserProfile } = useUser();

  if (!user) return null;

  return (
    <div className="profile-page">
      <h2>Profile</h2>

      <EmailOTPSection
        currentEmail={user.email}
        isEmailVerified={user.is_email_verify}
        fetchUserProfile={fetchUserProfile}
      />
      <NamePhoneSection
        name={user.name}
        phone_number={user.phone_number}
        fetchUserProfile={fetchUserProfile}
      />
      <AddressSection
        street_address={user.street_address}
        unit_number={user.unit_number}
        postal_code={user.postal_code}
        city={user.city}
        fetchUserProfile={fetchUserProfile}
      />
      <PasswordSection
        has_password={user.has_password}
        fetchUserProfile={fetchUserProfile}
      />
    </div>
  );
};

export default Profile;
