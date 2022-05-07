import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormControl, Form } from  'react-bootstrap';

function Searchbar() {
    // state
     const[searchTerm, setSearchTerm] = useState('');

    // using useNavigate hook
    const navigate = useNavigate();

// handleSubmit function
  const handleSubmit = e => {
      e.preventDefault();

      //adding query parameter - here we are redirecting user to the search page
      navigate(`/search?name=${searchTerm}`)
      setSearchTerm('')
  }

  return (
        <Form className="d-flex search-form" onSubmit={handleSubmit}>
            <FormControl
                type="text"
                placeholder="Search recipe"
                className="me-2"
                aria-label="Search name" 
                id='search'
                onChange={e => setSearchTerm(e.target.value)}
                value={searchTerm}
                disabled
            />
    </Form> 
  )
}

export default Searchbar