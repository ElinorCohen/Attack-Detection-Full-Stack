import { useNavigate } from "react-router-dom";
import {
  Input,
  Form,
  Wrapper,
  ResetPasswordButton,
  Alignp,
  AlignH1,
  BackButton,
} from "./ForgotPassword.style";
import axios from "axios";

function ForgotPassword() {
  function returnLogin() {
    navigate("/login");
  }
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    axios
      .post("/api/User/forgotPassword", {
        password: data.Password,
        email: data.Email,
      })
      .then((response) => {
        // console.log(response.data);
        alert(response.data);
        returnLogin();
      })
      .catch((error) => {
        alert(error.response.data);
        target.reset();
        console.error(error);
      });
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <AlignH1>Forgot Password?</AlignH1>
        <Alignp>Reset password in one quick step</Alignp>
        <Input name="Email" type="email" placeholder="Enter your email" />
        <ResetPasswordButton>Reset Password</ResetPasswordButton>
        <BackButton onClick={returnLogin}>Back</BackButton>
      </Form>
    </Wrapper>
  );
}

export default ForgotPassword;
