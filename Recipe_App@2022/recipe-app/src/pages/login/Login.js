import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { Helmet} from 'react-helmet';


export default function Signup() {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
 
// using the useSIgnup hook
const {login, isPending, error} = useLogin();
  
// handleSubmit function
const handleSubmit = (e) => {
  e.preventDefault();
 login(email, password);
}

  return (
      <form className='signup-form' onSubmit={handleSubmit}>
         <Helmet >
              <title> StartCooking | Login</title>
              <meta
                  name='description'
                  content='Login for the existing users'
               />
              <meta
                  name='keyword'
                  content='login, sign in'
               />
         </Helmet>

          <h2>Login</h2>

          <label>
              <span>Email: </span>
              <input
                  required
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
          </label>

          <label>
              <span>Password: </span>
              <input
                  required
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                
                />
          </label>

          { error && <div className='error'> {error}</div>}
          
          { !isPending && <button className="btn">Login </button> }
          { isPending && <button className='btn' disabled>logging in...</button> }
          
      </form>
  )
}
