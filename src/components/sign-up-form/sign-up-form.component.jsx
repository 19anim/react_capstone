import {
  createAuthUserWithEmailAndPassword,
  createUserDocRefFromAuth,
} from "../../utils/firebase.utils";

import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormField = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFormField);
  const { displayName, email, password, confirmPassword } = formField;

  const resetFormField = () => {
    setFormField(defaultFormField);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Confirm password must be the same!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocRefFromAuth(user, { displayName });
      resetFormField();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Can not create user, the email is used");
      } else {
        console.log("Error in creating user", error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormField({ ...formField, [name]: value });
  };
  return (
    <div>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOption={{
            type: "text",
            required: true,
            name: "displayName",
            onChange: handleChange,
            value: displayName,
          }}
        />
        <FormInput
          label="Email"
          inputOption={{
            type: "email",
            required: true,
            name: "email",
            onChange: handleChange,
            value: email,
          }}
        />
        <FormInput
          label="Password"
          inputOption={{
            type: "password",
            required: true,
            name: "password",
            onChange: handleChange,
            value: password,
          }}
        />
        <FormInput
          label="Confirm password"
          inputOption={{
            type: "password",
            required: true,
            name: "confirmPassword",
            onChange: handleChange,
            value: confirmPassword,
          }}
        />
        <Button buttonType="google" type="submit">Sign up</Button>
        
      </form>
    </div>
  );
};

export default SignUpForm;
