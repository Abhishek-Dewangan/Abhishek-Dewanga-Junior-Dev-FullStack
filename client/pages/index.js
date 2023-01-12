import axios from 'axios';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';

const Home = () => {
  const [username, setUsername] = useState('');
  const [token, setToken] = useState('');
  const [userid, setUserid] = useState();
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const navigate = useRouter();
  const date = new Date().toString().split(' ');

  useEffect(() => {
    const name = localStorage.getItem('username') || '';
    const token = localStorage.getItem('token') || '';
    const userid = localStorage.getItem('userid') || '';
    const oldDate = localStorage.getItem('date') || '';
    setUserid(userid);
    setUsername(name);
    setToken(token);
    if (!token) navigate.push('/signup');
    else {
      getTask(userid);
      setInterval(() => {
        const newDate = new Date().toString().split(' ')[2];
        if (!oldDate) {
          localStorage.setItem('date', date[2]);
        }
        if (oldDate && oldDate !== newDate) {
          updateTask(userid);
        }
      }, 200000);
    }
  }, []);

  const curentDate = `${
    date[2][date[2].length - 1] === '1'
      ? date[2] + 'st'
      : date[2][date[2].length - 1] === '2'
      ? date[2] + 'nd'
      : date[2] === '3'
      ? date[2] + 'rd'
      : date[2] + 'th'
  } ${date[1]}, ${date[3]}`;

  const updateTask = async (userid) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/task/updatetask/${userid}`,
        {task: []}
      );
      getTask(userid);
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (userid) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/task/gettask/${userid}`
      );
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8080/api/task/addtask/${userid}`,
        {task}
      );
      getTask(userid);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/user/logout',
        {token: token},
        {
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      alert(res.data.message);
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
    localStorage.clear();
    navigate.push('/signup');
  };

  return username ? (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className='flex  bg-#FFFFFF '>
        <div className='outline outline-gray-500 outline-1 w-fit h-full rounded grid gap-5 w-fit place-content-center mx-auto mt-20 p-10 m-3'>
          <p className='text-xl'>Welcome!</p>
          <h1 className='text-2xl font-bold'>{username}</h1>
          <p className=''>Good to see you here!</p>
          <p className='text-l font-bold'>Tasks for {curentDate}:</p>
          {tasks && (
            <div>
              <ul className='list-disc ml-5'>
                {tasks.map((elem, i) => {
                  return <li key={i}>{elem}</li>;
                })}
              </ul>
            </div>
          )}
          <form onSubmit={addTask} className='grid gap-5'>
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
          <button onClick={logout} className='font-bold'>
            Logout
          </button>
        </div>
        <div className='w-6/12 invisible lg:visible md:invisible'>
          <img
            src='https://img.freepik.com/free-vector/programming-concept-illustration_114360-1213.jpg?w=2000'
            alt='Image'
          />
        </div>
      </div>
    </div>
  ) : (
    <h1>Redirect to signup</h1>
  );
};

export default Home;
