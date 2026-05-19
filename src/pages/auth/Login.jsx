import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function Login() {

  const { setIsLoggedIn, setLoggedUserId } = useContext(AuthContext)

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState(null)

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault();

    // ... contact backend to validate user credentials
    const body = {
      email: email,
      password: password
    }

    try {
      
      const response = await axios.post("http://localhost:5005/api/auth/login", body)

      // storing the token safely in localstorage
      localStorage.setItem("authToken", response.data.authToken)

      // update the auth context states accordingly
      setIsLoggedIn(true)
      setLoggedUserId(response.data.payload._id)

      console.log(response.data)

      navigate("/private-page-example")

    } catch (error) {
      console.log(error)
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        // navigate("/error")
      }
    }


  };

  return (
    <div>

      <h1>Login Form</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Login</button>

        {errorMessage && <p>{errorMessage}</p>}
        
      </form>
      
    </div>
  );
}

export default Login;
