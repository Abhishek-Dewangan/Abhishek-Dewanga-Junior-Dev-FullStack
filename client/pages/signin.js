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
        'http://localhost:8080/api/user/signin',
        userData
      );
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
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
      <div className='outline outline-gray-500 outline-1 rounded grid gap-5 w-fit place-content-center mx-auto mt-20 p-10'>
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
              value='Register'
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
    </div>
  );
};

export default signin;
