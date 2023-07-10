import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('I love this');
    login(email, password);
  };

  return (
    <div className='d-flex align-items-center justify-content-center min-vh-70'>
      <div className='bg-gray-900 rounded-lg p-5 shadow'>
        <h1 className='my-3'>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={(e) => setEmail(e.target.value)}
            className='form-control rounded mt-2 px-3 py-1'
            placeholder='Enter Email'
          />
          <br />
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className='form-control rounded mt-2 px-3 py-1'
            placeholder='Enter Password'
          />
          <br />
          <div className='d-flex justify-content-center'>
            <button
              disabled={!email || !password}
              className='btn btn-success rounded-full mt-2 px-3 py-1 font-weight-bold fs-5 text-white'
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;



