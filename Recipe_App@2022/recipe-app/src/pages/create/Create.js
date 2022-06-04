import { useRef, useState } from 'react';
import { useAuthContext} from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useFirestore} from '../../hooks/useFirestore';
import Helmet from 'react-helmet';

//import styles
import './Create.css';

function Create() {
  // state 
    const[image, setImage] = useState('');
    const[title, setTitle] = useState('');
    const[instructions, setInstructions] = useState('');
    const[newIngredient, setNewIngredient] = useState('');
    const[ingredients, setIngredients] = useState([]);
    const[date, setDate] = useState('');
    const ingredientInput = useRef(null);
    const[formError, setFormError] = useState(null);

    //using useNavigate hook
    const navigate = useNavigate();

    //using useAuthContext
    const{ user } = useAuthContext();
  
// using useFirestore hook
   const { addDocument, response } = useFirestore('recipes');

  const handleSubmit = async e  => {
          e.preventDefault();
          setFormError(null);

          //recipe creater:
          const createdBy ={
            displayName: user.displayName,
            id: user.uid
          }

          // this will save as a object in database
          const recipe ={
            image,
            title,
            instructions, 
            ingredients,
            date,
            createdBy
          }

         await addDocument(recipe);

        // redirect user  to home page once user added the recipe
        if(!response.error){
          navigate('/')
        }
  
   }

//handleClick
const handleClick = e => {
  e.preventDefault();
  const ing = newIngredient.trim();                  // .trim() - will trim white space

  if(ing && !ingredients.includes(ing)) { // this will make sure we are not just adding white space and also avoid duplicates if ing
      setIngredients(prevIngredients => [...prevIngredients, ing]); 
  }
  setNewIngredient('');
  ingredientInput.current.focus()  // will focus the input filed
}


  return (
        <div className='create-form'>
          <Helmet>
                <title>StartCooking | Create Recipe</title>
                <meta
                    name='description'
                    content='Add new recipe'
                />
                <meta
                    name='keyword'
                    content='add, new, recipe'
                />
          </Helmet>
            
          <h1> Add a New Recipe</h1>
            <form onSubmit={handleSubmit}>

              <label>
                  <span>Image:</span>
                  <input 
                      type="text"
                      onChange={e => setImage(e.target.value)}
                      value={image}
                      required
                  />
              </label>
                
                <label>
                  <span>Recipe title:</span>
                  <input 
                      required
                      type="text"
                      onChange={e => setTitle(e.target.value)}
                      value={title}
                      />
                </label>
                      {/* add ingredients here ... */}
                <label>
                    <span>Ingredients:</span>
                    <div className="ing">
                        <input 
                          type="text" 
                          onChange={e => setNewIngredient(e.target.value)}
                          value={newIngredient}
                          ref={ ingredientInput}
                        />
                        <button className='btn' onClick={handleClick}>add</button>
                    </div>
                </label>
                {/* using ing as a key because we are not allowing duplicates when adding the ingredinets - hence, each ing is unique */}
                <p>Added ingredients: { ingredients.map(ing => <em key={ing}> {ing}, </em>)} </p>  

                <label>
                  <span>Instructions:</span>
                  <textarea 
                      required
                      onChange={e => setInstructions(e.target.value)}
                      value={instructions}
                  />
                </label>
                <label >
                    <span>Date:</span>
                    <input 
                      type="date"
                      onChange={e => setDate(e.target.value)}
                      required
                    />
                </label>
                <button className='btn'>Submit</button>

                {/* managing form error */}
                  { formError && <p className='error'>  {formError} </p>}
            </form>
        </div>
  )
}

export default Create