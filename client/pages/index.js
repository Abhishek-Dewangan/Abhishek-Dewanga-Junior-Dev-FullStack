import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

const Home = () => {
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const navigate = useRouter();
  const date = new Date().toString().split(' ');
  const curentDate = `${
    date[2][date[2].length - 1] === '1'
      ? date[2] + 'st'
      : date[2][date[2].length - 1] === '2'
      ? date[2] + 'nd'
      : date[2] === '3'
      ? date[2] + 'rd'
      : date[2] + 'th'
  } ${date[1]}, ${date[3]}`;
  // console.log(curentDate);
  useEffect(() => {
    const name = localStorage.getItem('username') || '';
    const token = localStorage.getItem('token') || '';
    const userid = localStorage.getItem('userid') || '';
    if (!token) navigate.push('/signup');
    setUsername(name);
  }, []);

  useEffect(async () => {
    const task = await axios.get('http://localhost:8080/api/user/addtask');
    console.log(task);
    setTasks();
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.task.value);
  };
  return username ? (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className='outline outline-gray-500 outline-1 rounded grid gap-5 w-fit place-content-center mx-auto mt-20 p-10'>
        <p className='text-4xl font-sans-serif'>Welcome!</p>
        <h1>{username}</h1>
        <p>Good to see you here!</p>
        <p className='font-bold'>Tasks for {curentDate}:</p>
        <form onSubmit={handleSubmit} className='grid gap-5'>
          <div>
            <input
              required
              type={'text'}
              name='task'
              placeholder='Eg. Need to finish my assignmet'
              className='outline outline-1 rounded px-5 py-2 w-80'
              onChange={(e) => setTask(e.target.value)}
            />
          </div>

          <div className='text-center'>
            <input
              type={'submit'}
              value='Add New Task'
              className='bg-black text-white px-5 py-2 w-80 mr-4 rounded'
            />
          </div>
        </form>
        <button className='font-bold'>Logout</button>
      </div>
    </div>
  ) : (
    <h1>Redirect to signup</h1>
  );
};

export default Home;
