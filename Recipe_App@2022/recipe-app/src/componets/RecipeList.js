import { Link } from 'react-router-dom';
import { Card, Col, Row} from 'react-bootstrap';

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
        <Row xs={1} md={2} lg={3} className="g-4 list">
          {recipes.map(recipe => (
            <Col key={recipe.id} >
              <Card className='h-100 card'>
                  <Card.Img variant="top" src={recipe.image} />
                  <Card.Body>
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>
                        Instructions: {recipe.instructions.substring(0, 100)}...
                        <Link to={`recipes/${recipe.id}`}>Cook</Link>
                    </Card.Text>
                  </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
  )
}
export default RecipeList