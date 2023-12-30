import axios from "axios";
import {
  ProfileWrapper,
  Button,
  ButtonsWrapper,
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
import trash from "../../assets/icons/trash-can.png";
import edit from "../../assets/icons/pencil.png";
import save from "../../assets/icons/diskette.png";
import padlock from "../../assets/icons/padlock.png";

import {
  useEffect,
  useMemo,
  useState,
  // useContext
} from "react";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../../components/Alert/AlertComponent ";
import AlertDelete from "../../components/AlertDelete/AlertDelete";
// import { AuthContext } from "../../contexts/AuthContext";

function Profile() {
  const navigate = useNavigate();

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

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");

  const [showDelete, setShowDelete] = useState(false);

  function navigateChangePassword() {
    navigate("/changepassword");
  }

  function navigateLogin() {
    navigate("/login");
  }

  // const { email } = useContext(AuthContext);
  // console.log(email);
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleCloseDelete = () => {
    setShowDelete(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.get("/api/User/deleteAccount");
      console.log(response);
      navigateLogin();
    } catch (error) {
      alert(error.response.data);
    }
  };

  const handleClickDelete = () => {
    setShowDelete(true);
  };

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
    console.log(user);
  };

  const handleSaveChanges = async () => {
    try {
      // Update the user state
      user.country = selectedCountry ? selectedCountry.label : "";
      user.status = selectedStatus ? selectedStatus.label : "";

      // Make an Axios POST request to the backend
      const response = await axios.post("/api/User/editUser", user);
      console.log(response);
      if (response.data.attackDetected !== "None") {
        setShowAlert(true);
        setMessage(`The detected attack was ${response.data.attackDetected}`);
      }
    } catch (error) {
      console.error("Error while saving changes:", error);
      // Handle error appropriately (e.g., show an error message to the user)
    }
    // Toggle the editing state
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
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Set a high z-index for the dropdown menu
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
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Set a high z-index for the dropdown menu
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
      {showAlert && (
        <AlertComponent message={message} onClose={handleCloseAlert} />
      )}
      {showDelete && (
        <AlertDelete
          onClose={handleCloseDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
      <ProfileWrapper>
        <ProfileContent>
          <HeaderWrapper>
            <img
              src={defaultUserPicture}
              style={{
                borderRadius: "50%",
                height: "110px",
                width: "110px",
                boxShadow: "0px 0px 9px grey",
              }}
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
                />
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
                <UserData
                  dangerouslySetInnerHTML={{
                    __html: user.lastName,
                  }}
                />
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
                menuPortalTarget={document.body}
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
                menuPortalTarget={document.body}
              />
            ) : (
              <UserData>{user.status}</UserData>
            )}
          </Field>
        </ProfileContent>
        <ButtonsWrapper>
          <Button onClick={isEditing ? handleSaveChanges : handleToggleEditing}>
            {isEditing ? "Save Changes" : "Edit Profile"}
            <img
              src={isEditing ? save : edit}
              alt=""
              style={{
                height: "0.8rem",
                paddingLeft: "5px",
                // paddingTop: "3px",
              }}
            />
          </Button>
          <Button onClick={navigateChangePassword}>
            Change Password
            <img
              src={padlock}
              alt=""
              style={{
                height: "0.8rem",
                paddingLeft: "5px",
                // paddingTop: "3px",
              }}
            />
          </Button>
          <Button
            onClick={handleClickDelete}
            style={{ backgroundColor: "lightCoral" }}
          >
            Delete Account
            <img
              src={trash}
              alt=""
              style={{
                height: "0.8rem",
                paddingLeft: "5px",
                // paddingTop: "3px",
              }}
            />
          </Button>
        </ButtonsWrapper>
      </ProfileWrapper>
    </>
  );
}

export default Profile;
