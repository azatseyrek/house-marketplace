// React:
import {useState} from 'react';
// React-Router-Dom:
import {Link, useNavigate} from 'react-router-dom';
// Firebase:
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
// Toastify:
import {toast} from 'react-toastify';
// Assets:
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const {email, password} = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      if (user) {
        navigate('/profile');
      }
    } catch (error) {
      toast.error(error.message.split('/')[1].slice(0, -2).toUpperCase());
    }
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back!</p>
        </header>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="emailInput"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              id="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
            />
            <img
              className="showPassword"
              src={visibilityIcon}
              alt="show password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          <Link className="forgotPasswordLink" to="/forgat-password">
            Forgat Password
          </Link>
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button type="submit" className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <OAuth />
        <Link to="/sign-up" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
};

export default SignIn;
