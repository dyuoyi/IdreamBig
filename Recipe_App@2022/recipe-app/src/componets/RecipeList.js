import { Link } from 'react-router-dom';


//import styles
import './RecipeList.css'


function RecipeList( { recipes}) {

  // rendering dynamic template
      // if there is empty array of recipe - will return the following 
  if(recipes.length === 0){
    return <div className='error'>No recipe to load...</div>
  }

   // for non-empty array of recipes
  return (
     <div className='recipe-list'>
          { recipes.map(recipe => (
              <div key={recipe.id} className='card'>
                  <img src={recipe.image} alt='food-image' />
                  <h3>{recipe.title}</h3>
                  <div>Instructions: { recipe.instructions.substring(0, 150)}...</div>
                  <Link to={`recipes/${recipe.id}`}>Cook</Link>
              </div>
          ))}
    </div>
  )
}

export default RecipeList
