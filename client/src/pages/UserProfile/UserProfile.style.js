import styled from "styled-components";

export const ProfileWrapper = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

export const Field = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const EditableField = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
`;

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
`;
