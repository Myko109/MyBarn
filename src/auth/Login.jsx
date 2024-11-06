import { Button } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import { useAuth } from "./AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("email");
  const [pw, setPw] = useState("password");

  const { login } = useAuth;

  const navigate = useNavigate;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pw,
      });

      if (error) {
        alert("Login failed.");
      } else if (data) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex h-screen justify-center items-center">
      <div className="card">
        <h2>Login</h2>
        <form
          className="flex flex-col gap-3 p-3 border-2 rounded-md border-black"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md"
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              id="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              required
              className="w-full rounded-md"
            />
          </label>
          <Button color="primary" type="submit">
            Login
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Login;
