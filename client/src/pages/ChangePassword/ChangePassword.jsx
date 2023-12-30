// import axios from "axios";
import axios from "axios";
import {
  Form,
  Wrapper,
  SubmitButton,
  FieldWrapper,
  Input,
  ShowPassword,
} from "./ChangePassword.style";
import { useNavigate } from "react-router-dom";

import Show from "../../assets/icons/show.png";
import Hide from "../../assets/icons/hide.png";
import { useState } from "react";

function ChangePassword() {
  const navigate = useNavigate();
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const toggleOldPasswordVisibility = () => {
    setIsOldPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(
      (prevIsPasswordVisible) => !prevIsPasswordVisible
    );
  };

  function navigateLogin() {
    navigate("/login");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    try {
      const response = await axios.post("/api/User/changePassword", data);
      console.log(response);
      navigateLogin();
    } catch (error) {
      console.log(error);
      target.reset();
      alert(error.response.data);
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <FieldWrapper>
          <Input
            name="oldPassword"
            type={isOldPasswordVisible ? "text" : "password"}
            placeholder="Old Password"
          />
          <ShowPassword
            src={isOldPasswordVisible ? Show : Hide}
            onClick={toggleOldPasswordVisibility}
          />
        </FieldWrapper>
        <FieldWrapper>
          <Input
            name="newPassword"
            type={isNewPasswordVisible ? "text" : "password"}
            placeholder="New Password"
          />
          <ShowPassword
            src={isNewPasswordVisible ? Show : Hide}
            onClick={toggleNewPasswordVisibility}
          />
        </FieldWrapper>
        <FieldWrapper>
          <Input
            name="confirmPassword"
            type={isConfirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm New Password"
          />
          <ShowPassword
            src={isConfirmPasswordVisible ? Show : Hide}
            onClick={toggleConfirmPasswordVisibility}
          />
        </FieldWrapper>
        <SubmitButton>Set Password</SubmitButton>
      </Form>
    </Wrapper>
  );
}

export default ChangePassword;
