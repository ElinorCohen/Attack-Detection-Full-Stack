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
  // RegisterField,
  ShowPassword,
  ErrorText,
  ButtonsWrapper,
} from "./Login.style";

// import GetCookie from "../../hooks/getCookie/getCookie";

import { useNavigate } from "react-router-dom";
import {
  useState,
  // , useContext
} from "react";
import userIcon from "./user.png";
import pswIcon from "./padlock.png";
import AnimatedLogo from "../../assets/lotties/EDgL26btNA.json";
import Show from "../../assets/icons/show.png";
import Hide from "../../assets/icons/hide.png";
import axios from "axios";
import AlertComponent from "../../components/Alert/AlertComponent ";
// import { AuthContext } from "../../contexts/AuthContext";
// import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessage, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  // const { email } = useContext(AuthContext);
  // console.log(email);
  const handleCloseAlert = () => {
    setShowAlert(false);
    navigateHomePage();
  };
  // const { saveEmail } = useContext(AuthContext);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  };

  function navigateHomePage() {
    navigate("/home");
  }

  function navigateRegister() {
    navigate("/register");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    try {
      const response = await axios.post(
        "/api/User/login",
        {
          email: data.Email,
          password: data.Password,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.detectedAttack !== "None") {
        setShowAlert(true);
        setMessage(`The detected attack was ${response.data.detectedAttack}`);
      } else {
        navigateHomePage();
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Username or password is invalid");
    }
  };
  return (
    <Wrapper>
      {showAlert && (
        <AlertComponent message={message} onClose={handleCloseAlert} />
      )}
      <LogoWrapper>
        <Title>ATTACK</Title>
        <LottieLogo animationData={AnimatedLogo} />
        <Title>METER</Title>
      </LogoWrapper>

      <Form onSubmit={handleSubmit}>
        <Fields>
          <FieldWrapper>
            <Icon src={userIcon} alt="userIcon" />
            <Input
              name="Email"
              // type="email"
              placeholder="Type you email"
              required
            />
          </FieldWrapper>
          <FieldWrapper>
            <Icon src={pswIcon} alt="pswIcon" />
            <Input
              name="Password"
              type={isPasswordVisible ? "text" : "password"}
              required
              placeholder="Type your password"
            />
            <ShowPassword
              src={isPasswordVisible ? Show : Hide}
              onClick={togglePasswordVisibility}
            />
          </FieldWrapper>
        </Fields>
        {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
        <ForgotPassword to="/ForgotPassword">Forgot password?</ForgotPassword>
        <ButtonsWrapper>
          <SubmitButton
            type="submit"
            // onClick={navigateHomePage}
          >
            LOGIN
          </SubmitButton>
          {/* <RegisterField> */}
          OR
          <SubmitButton onClick={navigateRegister}>REGISTER</SubmitButton>
          {/* </RegisterField> */}
        </ButtonsWrapper>
      </Form>
    </Wrapper>
  );
}

export default Login;
