import Link from 'next/link';
import React, {useState} from 'react';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import axios from 'axios';
import {useRouter} from 'next/router';

const signin = () => {
  const [passwordType, setPasswordType] = useState('password');
  const navigate = useRouter();
  const signin = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        email: e.target.email.value,
        password: e.target.password.value,
      };
      const res = await axios.post(
        'https://mytodoapp-hsvf.onrender.com/api/user/signin',
        userData
      );
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('userid', res.data.userid);
      alert(res.data.message);
      navigate.push('/');
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };
  return (
    <div>
      <title>Signin</title>
      <div className='lg:flex  bg-#FFFFFF '>
        <div className='outline outline-gray-500 outline-1 rounded grid gap-5 w-fit h-full place-content-center mx-auto mt-20 w-96 px-3 py-11'>
          <p className='text-2xl'>Welcome!</p>
          <p className='text-3xl font-bold'>Sign in to</p>
          <form onSubmit={signin} className='grid gap-5'>
            <div>
              <label>Email</label>
              <br />
              <input
                required
                type={'text'}
                name='email'
                placeholder='Eg. john@gamil.com'
                className='outline outline-1 rounded px-5 py-2 w-80'
              />
            </div>
            <div>
              <label>Password</label>
              <br />
              <input
                required
                type={passwordType}
                name='password'
                placeholder='*********'
                className='outline outline-1 rounded px-5 py-2 w-80'
              />
              <button
                type='button'
                onClick={() =>
                  setPasswordType(
                    passwordType === 'password' ? 'text' : 'password'
                  )
                }
              >
                {passwordType === 'password' ? (
                  <AiFillEyeInvisible className='inline relative right-5' />
                ) : (
                  <AiFillEye className='inline relative right-5' />
                )}
              </button>
            </div>
            <div className='text-center'>
              <input
                type={'submit'}
                value='SignIn'
                className='bg-black text-white px-5 py-2 w-80 mr-4 rounded'
              />
            </div>
          </form>
          <p className='text-center text-gray-600'>
            Don't have an account?{' '}
            <Link href={'/signup'} className='text-blue-800 font-bold'>
              Register
            </Link>
          </p>
        </div>
        <div className='w-6/12 invisible lg:visible md:invisible'>
          <img
            src='https://img.freepik.com/free-vector/programming-concept-illustration_114360-1213.jpg?w=2000'
            alt='Image'
          />
        </div>
      </div>
    </div>
  );
};

export default signin;
