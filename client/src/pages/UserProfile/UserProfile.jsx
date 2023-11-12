import axios from "axios";
import {
  ProfileWrapper,
  Button,
  EditableField,
  Field,
  Label,
  NameFieldsWrapper,
  ProfileContent,
  HeaderWrapper,
  UserData,
} from "./UserProfile.style";
import Select from "react-select";
import countryList from "react-select-country-list";
import defaultUserPicture from "../../assets/images/default-user-image.png";

import {
  useEffect,
  useMemo,
  useState,
  // useContext
} from "react";
// import { AuthContext } from "../../contexts/AuthContext";

function Profile() {
  const [user, setUser] = useState({});
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const options = useMemo(() => countryList().getData(), []);
  const statusOptions = useMemo(
    () => [
      { value: "student", label: "Student" },
      { value: "teacher", label: "Teacher" },
      { value: "employee", label: "Employee" },
      { value: "other", label: "Other" },
    ],
    []
  );

  const [isEditing, setIsEditing] = useState(false);
  // const { email } = useContext(AuthContext);
  // console.log(email);

  useEffect(() => {
    // Define an async function and immediately invoke it
    (async () => {
      try {
        // Axios GET request with await
        const response = await axios.get("/api/User/getUserData");
        await setUser(response.data);
        setSelectedCountry(
          options.find((option) => option.label === response.data.country)
        );
        setSelectedStatus(
          statusOptions.find((option) => option.label === response.data.status)
        );
      } catch (error) {
        console.error("Get User Data failed:", error);
      }
    })();
  }, [options, statusOptions]);

  const handleFieldChange = (field, value) => {
    setUser({
      ...user,
      [field]: value,
    });
  };

  const handleSaveChanges = () => {
    // Here, you can send the updated user data to your backend API
    // For simplicity, we're just toggling the editing state
    console.log(selectedCountry);
    user.country = selectedCountry ? selectedCountry.label : "";
    user.status = selectedStatus ? selectedStatus.label : "";
    console.log(user);
    setIsEditing(!isEditing);
  };

  const handleToggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const selectStylesForCountry = {
    control: (provided) => ({
      ...provided,
      display: "flex",
      height: "3rem",
      width: "100vw",
      maxWidth: "13.5rem",
      fontSize: "17px",
      border: "1px solid black",
      borderRadius: "14px",
    }),
  };

  const selectStylesForOptions = {
    control: (provided) => ({
      ...provided,
      display: "flex",
      height: "3rem",
      width: "100vw",
      maxWidth: "13.5rem",
      fontSize: "17px",
      border: "1px solid black",
      borderRadius: "14px",
    }),
  };

  function handleCountryChange(selectedOption) {
    setSelectedCountry(selectedOption);
  }

  function handleStatusChange(selectedOption) {
    setSelectedStatus(selectedOption);
  }

  console.log(user);
  return (
    <>
      {/* <form encType="multipart/form-data" method="POST" action="/upload">
        <input type="file" name="userImage" accept="image/*" />
        <button type="submit">Upload</button>
      </form> */}
      <ProfileWrapper>
        <ProfileContent>
          <HeaderWrapper>
            <img
              src={defaultUserPicture}
              style={{ borderRadius: "50%", height: "110px", width: "110px" }}
            />
            <h2 style={{ fontSize: "2rem", paddingLeft: "25px" }}>
              User Profile
            </h2>
          </HeaderWrapper>
          <Field>
            <NameFieldsWrapper>
              <Label>First name:</Label>
              {isEditing ? (
                <EditableField
                  type="text"
                  value={user.firstName}
                  onChange={(e) =>
                    handleFieldChange("firstName", e.target.value)
                  }
                />
              ) : (
                <UserData
                  dangerouslySetInnerHTML={{
                    __html: user.firstName,
                  }}
                ></UserData>
              )}

              <Label style={{ paddingLeft: "50px" }}>Last name:</Label>
              {isEditing ? (
                <EditableField
                  type="text"
                  value={user.lastName}
                  onChange={(e) =>
                    handleFieldChange("lastName", e.target.value)
                  }
                />
              ) : (
                user.lastName
              )}
            </NameFieldsWrapper>
          </Field>
          <Field>
            <Label>Email:</Label>
            {isEditing ? (
              <EditableField
                type="email"
                value={user.email}
                onChange={(e) => handleFieldChange("email", e.target.value)}
                disabled
              />
            ) : (
              <UserData>{user.email}</UserData>
            )}
          </Field>
          <Field>
            <Label>Country:</Label>
            {isEditing ? (
              // <EditableField
              //   type="password"
              //   value={user.country}
              //   onChange={(e) => handleFieldChange("country", e.target.value)}
              // />
              <Select
                options={options}
                value={selectedCountry}
                onChange={handleCountryChange}
                required
                styles={selectStylesForCountry}
              />
            ) : (
              <UserData>{user.country}</UserData>
            )}
          </Field>
          <Field>
            <Label>Status:</Label>
            {isEditing ? (
              // <EditableField
              //   type="password"
              //   value={user.status}
              //   onChange={(e) => handleFieldChange("password", e.target.value)}
              // />
              <Select
                options={statusOptions}
                value={selectedStatus}
                onChange={handleStatusChange}
                // placeholder={user.status}
                required
                styles={selectStylesForOptions}
              />
            ) : (
              <UserData>{user.status}</UserData>
            )}
          </Field>
          <Button onClick={isEditing ? handleSaveChanges : handleToggleEditing}>
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
          <Button>Change Password</Button>
        </ProfileContent>
      </ProfileWrapper>
    </>
  );
}

export default Profile;
