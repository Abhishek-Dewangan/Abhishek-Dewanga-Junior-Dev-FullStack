import Link from 'next/link';
import React, {useState} from 'react';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';
import axios from 'axios';
import {useRouter} from 'next/router';

const signup = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [confirmPasswordType, setConfirmPasswordType] = useState('password');
  const navigate = useRouter();

  const signup = async (e) => {
    e.preventDefault();
    try {
      if (e.target.password.value !== e.target.confirmpassword.value) {
        return alert('Confirm Password must be same as Password');
      }
      if (e.target.password.value.length < 8) {
        return alert('Password minium length should be 8');
      }
      const userData = {
        email: e.target.email.value,
        name: e.target.name.value,
        password: e.target.password.value,
      };
      const res = await axios.post(
        'https://mytodoapp-hsvf.onrender.com/api/user/signup',
        userData
      );
      alert(res.data.message);
      navigate.push('/signin');
    } catch (error) {
      console.log(error);
      if (error.response.data.error.name === 'ValidationError') {
        return alert('Please enter a valid email');
      }
      return alert(error.response.data.message);
    }
  };
  return (
    <div>
      <title>Signup</title>
      <div className='lg:flex  bg-#FFFFFF '>
        <div className='outline outline-gray-500 outline-1 rounded grid gap-5 w-fit h-full place-content-center mx-auto mt-16 w-96 px-3 py-11'>
          <p className='text-2xl'>Welcome!</p>
          <p className='text-3xl font-bold'>Sign up to</p>
          <form onSubmit={signup} className='grid gap-3'>
            <div>
              <label>Email</label>
              <br />
              <input
                required
                type='text'
                name='email'
                placeholder='Eg. john@gamil.com'
                className='outline outline-1 rounded px-5 py-1 w-80'
              />
            </div>
            <div>
              <label>Name</label>
              <br />
              <input
                required
                type={'text'}
                name='name'
                placeholder='Eg. John Doe'
                className='outline outline-1 rounded px-5 py-1 w-80'
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
                className='outline outline-1 rounded px-5 py-1 w-80'
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
            <div>
              <label>Confirm Password</label>
              <br />
              <input
                required
                type={confirmPasswordType}
                name='confirmpassword'
                placeholder='*********'
                className='outline outline-1 rounded px-5 py-1 w-80'
              />
              <button
                type='button'
                onClick={() =>
                  setConfirmPasswordType(
                    confirmPasswordType === 'password' ? 'text' : 'password'
                  )
                }
              >
                {confirmPasswordType === 'password' ? (
                  <AiFillEyeInvisible className='inline relative right-5' />
                ) : (
                  <AiFillEye className='inline relative right-5' />
                )}
              </button>
            </div>
            <div className='text-center'>
              <input
                type={'submit'}
                value='Register'
                className='bg-black text-white px-5 py-2 w-80 mr-4 mt-2 rounded cursor-pointer'
              />
            </div>
          </form>
          <p className='text-center text-gray-600'>
            Already have an account?{' '}
            <Link href={'/signin'} className='text-blue-800 font-bold'>
              SignIn
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

export default signup;
