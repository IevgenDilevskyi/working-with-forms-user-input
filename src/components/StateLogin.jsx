import { useState } from "react";
import Input from "./Input.jsx";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState('')
  // const [enteredPassword, setEnteredPassword] = useState('')
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  const emailIsInvalid =
    didEdit.email &&
    (!isEmail(enteredValues.email) || !isNotEmpty(enteredValues.email));
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevValues) => ({
      ...prevValues,
      [identifier]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(enteredValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur("email")}
          onChange={(event) => handleInputChange("email", event.target.value)}
          value={enteredValues.email}
          error={emailIsInvalid && "Please enter a valid email address"}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onChange={(event) =>
            handleInputChange("password", event.target.value)
          }
          onBlur={() => handleInputBlur("password")}
          value={enteredValues.password}
          error={passwordIsInvalid && "Please enter a valid password"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
