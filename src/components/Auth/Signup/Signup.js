import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import SigninImg from '../../../assets/signin-image.svg';
import LogoImage from '../../../assets/unibazar-home-images/unibazarlogo.png';
import FbImg from '../../../assets/fb.png';
import AppleImg from '../../../assets/apple.png';
import GoogleImg from '../../../assets/google.png';
import { IoMdEyeOff } from 'react-icons/io';
import Link from 'next/link';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import styles from './SignUp.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { register, loadUser } from '@/redux/slice/userSlice';
import Loader from '@/components/Loader/Loader';
import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

const Signup = () => {
  const [data, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const { user, isLoading, error } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const onchangeData = e => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...data, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(register(data));
  };

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      dispatch(loadUser());
    }
  }, []);

  useEffect(() => {
    if (user && user.success) {
      toast.success('Otp send successfully!');
      router.replace('/otp');
    }

    if (error && error.message) {
      toast.error(error.message);
    }
  }, [user, error]);

  const handleBackClick = () => {
    router.back();
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleMouseUpPassword = event => {
    event.preventDefault();
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <div className="md:hidden pt-12 pl-10  w-full flex">
          <IoChevronBackOutline className="bg-gray-50 rounded-full w-8 h-8 p-2 justify-center justify-items-center items-center" onClick={handleBackClick} />
        </div>
        <div className={`${styles.logo} pt-12 pl-12`}>
          <Link href="/">
            <Image src={LogoImage} alt="Logo" className="w-36" />
          </Link>
        </div>
      </div>
      <div className="w-full flex md:flex-row flex-col justify-around p-10">
        <div className={`${styles.mainimg} w-full md:ml-20 md:mt-10 p-5 `}>
          <Image src={SigninImg} alt="Signin_Image"></Image>
        </div>
        <div className="md:mr-10 md:pr-28  w-full p-5">
          <h1 className="text-3xl font-bold text-center">Sign up</h1>
          <p className="w-full text-normal text-gray-500 text-center py-3">Please fill the details and create account</p>
          <form className="flex flex-col justify-center items-center gap-3" onSubmit={handleSubmit}>
            <FormControl variant="outlined" className="md:w-[500px] w-[380px] border bg-gray-100 rounded">
              <InputLabel htmlFor="outlined-adornment-name">Name *</InputLabel>
              <OutlinedInput
                id="standard"
                type="text"
                onChange={onchangeData}
                placeholder="jhon steeves"
                required
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
                label="name"
              />
            </FormControl>
            <FormControl variant="outlined" className="md:w-[500px] w-[380px] border bg-gray-100 rounded">
              <InputLabel htmlFor="outlined-adornment-email">Email *</InputLabel>
              <OutlinedInput
                error={error && error.message ? true : false}
                id="standard-error-helper-text"
                type="email"
                onChange={onchangeData}
                placeholder="jhon@gmail.com"
                required
                helperText={error && error.message ? 'incorrect email' : ''}
                startAdornment={
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                }
                label="email"
              />
            </FormControl>
            <FormControl variant="outlined" className="md:w-[500px] w-[380px] border bg-gray-100 rounded">
              <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
              <OutlinedInput
                error={error && error.message ? true : false}
                id="standard-error-helper-text"
                type={showPassword ? 'text' : 'password'}
                onChange={onchangeData}
                placeholder="********"
                required
                helperText={error && error.message ? 'incorrect password' : ''}
                startAdornment={
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} onMouseUp={handleMouseUpPassword} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password *"
              />
            </FormControl>
            <p className="w-full text-normal text-gray-500 text-left p-1 pb-2">Password must be 8 character</p>
            <button
              type="submit"
              className="bg-teal-500 w-full hover:bg-teal-700 text-white font-bold py-
            2 px-4 rounded-xl py-3"
            >
              Sign Up
            </button>
            <p className="w-full text-gray-600 py-5 text-center">
              Already have an account ?{' '}
              <Link href="/login" className="text-blue-500">
                Sign in
              </Link>
              <br />
              Or connect
            </p>
            <div className="w-full flex md:flex-row items-center justify-center justify-items-center gap-1 py-2">
              <Image src={FbImg} alt="facbook-image"></Image>
              <Image src={AppleImg} alt="facbook-image"></Image>
              <Image src={GoogleImg} alt="facbook-image"></Image>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
