import {
  Form,
  Wrapper,
  SubmitButton,
  FieldWrapper,
  Input,
} from "./ChangePassword.style";

function ChangePassword() {
  function handleSubmit(event) {
    event.preventDefault();
    const { target } = event;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  }

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <FieldWrapper>
          <Input name="Password" type="password" placeholder="Old Password" />
        </FieldWrapper>
        <FieldWrapper>
          <Input name="Password" type="password" placeholder="New Password" />
        </FieldWrapper>
        <FieldWrapper>
          <Input
            name="Password"
            type="password"
            placeholder="Confirm New Password"
          />
        </FieldWrapper>
        <SubmitButton>Set Password</SubmitButton>
      </Form>
    </Wrapper>
  );
}

export default ChangePassword;
