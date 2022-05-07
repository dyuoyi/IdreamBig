import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
 
// import styles
import './Home.css';
//import componets
import RecipeList from '../../componets/RecipeList';


function Home() {
  //using useAuthContext hook
    const{ user } = useAuthContext();

  // using useCollection hook
   const { documents, error} = useCollection('recipes');

  return (
    <div className='home'>
            {error && <p className='error'> {error} </p> }
            { documents && <RecipeList recipes={ documents} />}
 
    </div>
  )
}

export default Home