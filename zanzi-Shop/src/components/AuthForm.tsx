import { useState } from "react";
import { loginUser, registerUser } from "../hooks/useAuth";
import toast from "react-hot-toast";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleAuth = async () => {
    try {
      if (isRegister) {
        await registerUser(email, password);
        toast.success("Userregistered successfully");
      } else {
        await loginUser(email, password);
        toast.success("User logged in successfully");
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  return (
  <div>
     <h2>{isRegister ? "Register" : "Login"}</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleAuth}>{isRegister ? "Register" : "Login"}</button>
      <p onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "New user? Register"}
      </p>

  </div>
  )
};

export default AuthForm;
