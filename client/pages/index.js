const Home = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.task.value);
  };
  return (
    <>
      <title>Dashboard</title>
      <div className='outline outline-gray-500 outline-1 rounded grid gap-5 w-fit place-content-center mx-auto mt-20 p-10'>
        <form onSubmit={handleSubmit} className='grid gap-5'>
          <div>
            <input
              required
              type={'text'}
              name='task'
              placeholder='Eg. Need to finish my assignmet'
              className='outline outline-1 rounded px-5 py-2 w-80'
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
      </div>
    </>
  );
};

export default Home;
