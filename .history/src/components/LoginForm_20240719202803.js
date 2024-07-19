import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  padding: 3rem 1rem;
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  > * + * {
    margin-top: 2rem;
  }
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
  > * + * {
    margin-top: 1.5rem;
  }
`;

const InputWrapper = styled.div`
  margin-top: 0.25rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--muted-foreground);
`;

const Input = styled.input`
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid var(--input);
  background-color: var(--background);
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: var(--foreground);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px var(--ring);
  }
`;

const Button = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 2.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary-foreground);
  background-color: var(--primary);
  border: none;
  border-radius: 0.375rem;
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
    <Container>
      <FormWrapper>
        <Title>Sign in to your account</Title>
        <Subtitle>
          Or <a href="#" className="font-medium text-primary hover:underline">register for a new account</a>
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
    </Container>
  );
  
export default LoginForm;
