import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import Helmet from 'react-helmet';

//styles
import  './Signup.css';

export default function Signup() {
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[displayName, setDisplayName] = useState('');
 
// using the useSIgnup hook
const { signup, isPending, error} = useSignup();
  
// handleSubmit function
const handleSubmit = (e) => {
  e.preventDefault();
 signup(email, password, displayName);
}

  return (
      <form className='signup-form' onSubmit={handleSubmit}>
            <Helmet>
                  <title>StartCooking | Signup</title>
                  <meta
                      name='description'
                      content='Signup form for new users'
                  />
                  <meta
                      name='keyword'
                      content='signup, new user'
                  />
            </Helmet>

          <h2>Sign up</h2>

          <label>
              <span>Name: </span>
              <input
                  required
                  type="text"
                  onChange={e => setDisplayName(e.target.value)}
                  value={displayName}
                />
          </label>

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

          
          { !isPending && <button className="btn">Signup </button> }
          { isPending && <button className="btn" disabled>Signing in...</button> }

          { error && <div className='error'> {error}</div>}
      
      </form>
  )
}