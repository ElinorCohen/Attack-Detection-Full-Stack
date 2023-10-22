import {
  ProfileWrapper,
  Button,
  EditableField,
  Field,
  Label,
} from "./UserProfile.style";

import { useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "********", // For security, you might not want to show the actual password
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleFieldChange = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const handleSaveChanges = () => {
    // Here, you can send the updated user data to your backend API
    // For simplicity, we're just toggling the editing state
    setIsEditing(!isEditing);
  };

  const handleToggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <ProfileWrapper>
      <h2>User Profile</h2>
      <Field>
        <Label>Name:</Label>
        {isEditing ? (
          <EditableField
            type="text"
            value={user.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
          />
        ) : (
          <span>{user.name}</span>
        )}
      </Field>
      <Field>
        <Label>Email:</Label>
        {isEditing ? (
          <EditableField
            type="email"
            value={user.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
          />
        ) : (
          <span>{user.email}</span>
        )}
      </Field>
      <Field>
        <Label>Password:</Label>
        {isEditing ? (
          <EditableField
            type="password"
            value={user.password}
            onChange={(e) => handleFieldChange("password", e.target.value)}
          />
        ) : (
          <span>{user.password}</span>
        )}
      </Field>
      <Button onClick={isEditing ? handleSaveChanges : handleToggleEditing}>
        {isEditing ? "Save Changes" : "Edit Profile"}
      </Button>
      <Button>Change Password</Button>
    </ProfileWrapper>
  );
}

export default Profile;
