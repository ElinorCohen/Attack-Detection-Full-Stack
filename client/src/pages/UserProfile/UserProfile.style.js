import styled from "styled-components";

export const ProfileWrapper = styled.div`
  /* max-width: 400px; */
  /* margin: 0 auto; */
  z-index: 1;

  padding: 40px;
  padding-bottom: 0;
  /* justify-content: space-between; */
  align-items: center;
  display: flex;
  flex-direction: column; /* Change flex-direction to column */
  /* border-radius: 20px; */
  /* background-color: whitesmoke; */
`;
export const ProfileContent = styled.div`
  width: 70vw;
  max-height: 63vh;
  margin: 0 auto;
  padding: 30px;
  padding-block: 20px;
  border-radius: 20px;
  background-color: #afafaf;
  overflow: auto;
  z-index: 1;

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export const Field = styled.div`
  /* margin: 10px 0; */
  display: flex;
  padding-block: 10px;
  /* justify-content: space-between; */
  /* align-items: center; */
`;

export const HeaderWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  /* justify-content: space-between; */
  /* align-items: center; */
  flex-direction: row;
`;

export const NameFieldsWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  /* justify-content: space-between; */
  /* align-items: center; */
  flex-direction: row;
`;

export const Label = styled.label`
  font-weight: bold;
  padding-right: 20px;
  font-size: 1.5rem;
  white-space: nowrap;
`;

export const EditableField = styled.input`
  /* max-width: fit-content; */
  padding: 4px;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
  font-size: 1rem;
`;

export const ButtonsWrapper = styled.div`
  /* background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer; */
  padding: 15px;
`;

export const Button = styled.button`
  background-color: #c7c7c7;
  color: black;
  /* border: none; */
  padding: 10px 15px;
  border-radius: 4px;
  margin-inline: 10px;
  cursor: pointer;
`;

export const UserData = styled.div`
  display: flex;
  padding-right: 20px;
  font-size: 1.1rem;
  white-space: nowrap;
  align-items: center;
  flex-wrap: nowrap;
  padding: 7.8px;
`;
