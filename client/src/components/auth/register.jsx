import React, { useContext, useState } from "react";
import { FaRegUser, FaPencilAlt, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiEyeFill, RiEyeCloseFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../main";
import register from "../../public/register.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email) && email) {
      toast.error("Email format is invalid");
      return;
    }

    if (!validatePassword(password) && password) {
      toast.error("Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number");
      return;
    }
    try {
      const { data } = await axios.post(
        import.meta.env.VITE_API_REGISTER_URL,
        { name, phone, email, role, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      navigate("/login");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(false);

      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(password);
  };

  if (isAuthorized) {
    return navigate("/login");
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <h3>Create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Fullname</label>
              <div>
                <input
                  className="inp"
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="abc@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="text"
                  placeholder="+97798233234113"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <FaPhoneAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {showPassword ? (
                  <RiEyeCloseFill onClick={togglePasswordVisibility} />
                ) : (
                  <RiEyeFill onClick={togglePasswordVisibility} />
                )}
              </div>
            </div>
            
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
            <Link to={"/login"} className="lb">
              Login Now
            </Link>
          </form>
        </div>
        <div className="banner">
          <img src={register} alt="login" />
        </div>
      </div>
    </>
  );
};

export default Register;
