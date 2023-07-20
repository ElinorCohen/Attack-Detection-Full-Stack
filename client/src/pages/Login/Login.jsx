import {
  Form,
  Wrapper,
  SubmitButton,
  FieldWrapper,
  Input,
  Title,
  ForgotPassword,
  Icon,
  Fields,
  LottieLogo,
  LogoWrapper,
  RegisterField,
} from "./Login.style";

import { useNavigate } from "react-router-dom";
import userIcon from "./user.png";
import pswIcon from "./padlock.png";
import AnimatedLogo from "../../assets/EDgL26btNA.json";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  function navigateHomePage() {
    navigate("/home");
  }

  function navigateRegister() {
    navigate("/register");
  }

  return (
    <Wrapper>
      <LogoWrapper>
        <Title>ATTACK</Title>
        <LottieLogo animationData={AnimatedLogo} />
        <Title>METER</Title>
      </LogoWrapper>
      <Form onSubmit={handleSubmit}>
        <Fields>
          <FieldWrapper>
            <Icon src={userIcon} alt="userIcon" />
            <Input name="Email" type="email" placeholder="Type you email" />
          </FieldWrapper>
          <FieldWrapper>
            <Icon src={pswIcon} alt="pswIcon" />
            <Input
              name="Password"
              type="password"
              placeholder="Type your password"
            />
          </FieldWrapper>
        </Fields>
        <ForgotPassword to="/ForgotPassword">Forgot password?</ForgotPassword>
        <SubmitButton onClick={navigateHomePage}>LOGIN</SubmitButton>
        <RegisterField>
          OR
          <SubmitButton onClick={navigateRegister}>REGISTER</SubmitButton>
        </RegisterField>
      </Form>
    </Wrapper>
  );
}

export default Login;
