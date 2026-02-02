import { useState } from "react";

const SignupForm = ({ handleLogin }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // TODO: implement signup

      // Reset form
      e.target.reset();
    } catch (error) {
      setError(error.message);
      console.log("error occurred during signup", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      <div className="login-inputs">
        <label>
          Email
          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={formData.email}
          />
        </label>

        <label>
          Password
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formData.password}
          />
        </label>
      </div>

      <button type="submit">Sign up</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupForm;
