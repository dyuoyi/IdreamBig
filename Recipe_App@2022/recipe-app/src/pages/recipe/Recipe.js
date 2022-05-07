import { useParams } from 'react-router-dom'; 
import { useDocument} from '../../hooks/useDocument';

//import styles
import './Recipe.css';

function Recipe() {
 // using useParams hook
    const {id } = useParams();

    //using useDocument hook
    const { document:recipe, error } = useDocument('recipes', id);

    // dynamic temeplate rendering
    if(error){
      return <div className='error'>{ error} </div>
    }
    if(!document){
      return <div className='loading'>loading...</div>
    }

  return (
    <div className='recipe'>
     
         { recipe && (
                <>
                    <h2 className='title'>{ recipe.title}</h2>
                    <p>Instructions: {recipe.instructions}</p>
                    <ul>
                        {/* <p style={{marginRight:3}}>Ingredients: </p> */}
                        { recipe.ingredients.map(ing => <li key= {ing}> {ing}</li>)}  
                    </ul>
                </>
         )
         }
    </div>
  )
}

export default Recipe