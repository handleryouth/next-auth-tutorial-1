import { useState } from "react";
import { signIn } from "next-auth/react";
import type { NextPage } from "next";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");

  const sendLoginVerification = (event) => {
    event.preventDefault();

    //notice, we are also redirecting users to the protected route instead of the homepage after signin in.
    signIn("email", {
      callbackUrl: "/",
      email,
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <h3>Enter your email address, and we will send you a verifaction link</h3>
      <form onSubmit={sendLoginVerification}>
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send magic link</button>
      </form>
    </div>
  );
};

export default Login;
