import { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

import {
  Wrapper,
  Input,
  AlreadyMember,
  FieldWrapper,
  Form,
  RegisterButton,
  WrapParagraphAndLink,
  AlignSelections,
  LogoWrapper,
  Title,
  LottieLogo,
  ShowPassword,
  ConfirmWrapper,
} from "./Register.style";

import AnimatedLogo from "../../assets/lotties/EDgL26btNA.json";
import Show from "../../assets/icons/show.png";
import Hide from "../../assets/icons/hide.png";
import axios from "axios";

function Register() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const options = useMemo(() => countryList().getData(), []);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevIsPasswordVisible) => !prevIsPasswordVisible);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData.entries());
    data.country = selectedCountry ? selectedCountry.label : "";
    data.status = selectedStatus ? selectedStatus.label : "";
    console.log(data);

    axios
      .post("/api/User/register", {
        password: data.Password,
        email: data.Email,
        firstName: data["first name"],
        lastName: data["last name"],
        country: data.country,
        status: data.status,
      })
      .then((response) => {
        console.log(response.data);
        // const token = response.data.token;

        // localStorage.setItem("token", token);
      })
      .catch((error) => {
        console.error("Register failed:", error);
      });
  }

  const statusOptions = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
    { value: "employee", label: "Employee" },
    { value: "other", label: "Other" },
  ];

  function handleCountryChange(selectedOption) {
    setSelectedCountry(selectedOption);
  }

  function handleStatusChange(selectedOption) {
    setSelectedStatus(selectedOption);
  }

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

  return (
    <Wrapper>
      <LogoWrapper>
        <Title>ATTACK</Title>
        <LottieLogo animationData={AnimatedLogo} />
        <Title>METER</Title>
      </LogoWrapper>
      <Form onSubmit={handleSubmit}>
        <FieldWrapper>
          <Input
            name="first name"
            type="text"
            placeholder="* First name"
            required
          />
        </FieldWrapper>
        <FieldWrapper>
          <Input
            name="last name"
            type="text"
            placeholder="* Last name"
            required
          />
        </FieldWrapper>
        <FieldWrapper>
          <Input
            name="Email"
            type="email"
            placeholder="* Email"
            required
          />
        </FieldWrapper>
        <FieldWrapper>
          <Input
            name="Password"
            type={isPasswordVisible ? "text" : "password"}
            placeholder="* Password (6 or more characters)"
            required
          />
          <ShowPassword
            src={isPasswordVisible ? Show : Hide}
            onClick={togglePasswordVisibility}
          />
        </FieldWrapper>
        <AlignSelections>
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={handleStatusChange}
            placeholder="* Status"
            required
            styles={selectStylesForOptions}
          />
          <Select
            options={options}
            value={selectedCountry}
            onChange={handleCountryChange}
            placeholder="* Country"
            required
            styles={selectStylesForCountry}
          />
        </AlignSelections>
        <ConfirmWrapper>
          <RegisterButton type="submit">Register</RegisterButton>
          <WrapParagraphAndLink>
            <p style={{ fontSize: "1.2rem", margin: "0" }}>
              Already a member?{" "}
            </p>
            <AlreadyMember to="/login">Login</AlreadyMember>
          </WrapParagraphAndLink>
        </ConfirmWrapper>
      </Form>
    </Wrapper>
  );
}

export default Register;
