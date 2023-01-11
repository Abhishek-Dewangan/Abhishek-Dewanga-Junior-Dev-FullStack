import Link from 'next/link';
import React, {useState} from 'react';
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai';

const signin = () => {
  const [passwordType, setPasswordType] = useState('password');
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    console.log(data);
  };
  return (
    <div className='outline outline-gray-500 outline-1 rounded grid gap-5 w-fit place-content-center mx-auto mt-20 p-10'>
      <form onSubmit={handleSubmit} className='grid gap-5'>
        <div>
          <label>Username</label>
          <br />
          <input
            required
            type={'text'}
            name='username'
            placeholder='exapmple-john123'
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
              setPasswordType(passwordType === 'password' ? 'text' : 'password')
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
  );
};

export default signin;
