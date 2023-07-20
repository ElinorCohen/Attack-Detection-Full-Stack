import React, { useState, useMemo } from "react";
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
} from "./Register.style";

function Register() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const options = useMemo(() => countryList().getData(), []);

  function handleSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData.entries());
    data.country = selectedCountry ? selectedCountry.label : "";
    console.log(data);
  }

  const statusOptions = [
    { value: "", label: "* Status" },
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
      width: "100%",
      maxWidth: "30rem",
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
      width: "100%",
      maxWidth: "30rem",
      fontSize: "17px",
      border: "1px solid black",
      borderRadius: "14px",
    }),
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <FieldWrapper>
          <Input name="first name" type="text" placeholder="* First name" />
        </FieldWrapper>
        <FieldWrapper>
          <Input name="last name" type="text" placeholder="* Last name" />
        </FieldWrapper>
        <FieldWrapper>
          <Input name="Email" type="email" placeholder="* Email" />
        </FieldWrapper>
        <FieldWrapper>
          <Input
            name="Password"
            type="password"
            placeholder="* Password (6 or more characters)"
          />
        </FieldWrapper>
        <AlignSelections>
          <FieldWrapper>
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={handleStatusChange}
              placeholder="* Status"
              styles={selectStylesForOptions}
            />
          </FieldWrapper>
          <FieldWrapper>
            <Select
              options={options}
              value={selectedCountry}
              onChange={handleCountryChange}
              placeholder="* Country"
              styles={selectStylesForCountry}
            />
          </FieldWrapper>
        </AlignSelections>
        <RegisterButton type="submit">Register</RegisterButton>
        <WrapParagraphAndLink>
          <p>Already on Atackometer? </p>
          <AlreadyMember to="/login">Login</AlreadyMember>
        </WrapParagraphAndLink>
      </Form>
    </Wrapper>
  );
}

export default Register;
