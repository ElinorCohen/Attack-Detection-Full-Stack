import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext({ email: null, saveEmail: null });

export default function AuthContextProvider(props) {
  const [email, setEmail] = useState("");

  function saveEmail(newEmail) {
    localStorage.setItem("email", newEmail);
    setEmail(newEmail)
  }

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, []);
  return (
    <AuthContext.Provider value={{ email, saveEmail }}>
      {props.children}
    </AuthContext.Provider>
  );
}
AuthContextProvider.propTypes = {
  children: PropTypes.element,
};
