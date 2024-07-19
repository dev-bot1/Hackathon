import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  padding: 3rem 1rem;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  space-y: 2rem;
`;

const Title = styled.h2`
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.875rem;
  font-weight: bold;
  letter-spacing: -0.025em;
  color: var(--foreground);
`;

const Subtitle = styled.p`
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--muted-foreground);
`;

const StyledForm = styled.form`
  margin-top: 1.5rem;
  space-y: 1.5rem;
`;

const InputWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted-foreground);
`;

const Input = styled.input`
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border: 1px solid var(--input);
  border-radius: 0.375rem;
  background-color: var(--background);
  color: var(--foreground);
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--ring);
  }
`;

const Button = styled.button`
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-foreground);
  background-color: var(--primary);
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: var(--primary-hover);
  }
`;

const LoginForm = ({ redirectPath }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "ADMIN@example.com" && password === "ADMIN") {
      navigate(redirectPath);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <Title>Sign in to your account</Title>
        <Subtitle>
          Or <a href="#">register for a new account</a>
        </Subtitle>
        <StyledForm onSubmit={handleLogin}>
          <InputWrapper>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputWrapper>
          <Button type="submit">Sign in</Button>
        </StyledForm>
      </FormWrapper>
    </FormContainer>
  );
};

export default LoginForm;
