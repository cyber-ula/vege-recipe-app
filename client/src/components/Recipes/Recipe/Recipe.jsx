import { Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material'
import moment from 'moment'
import { useDispatch } from 'react-redux';
import { likeRecipe, deleteRecipe } from '../../../actions/recipes';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import './recipe.scss'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useNavigate } from 'react-router-dom';

const Recipe = ({ recipe, setCurrentId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if (recipe?.likes.length > 0) {
      return recipe?.likes.find((like) => like === (user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{recipe.likes.length > 2 ? `You and ${recipe.likes.length - 1} others` : `${recipe.likes.length} like${recipe.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{recipe.likes.length} {recipe.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
  };

  const openRecipe = (e) =>{ navigate(`/recipes/${recipe._id}`)}

  return (
    <Card className="card">
      <CardMedia className="media" image={recipe.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}  />
      <div className="overlay">
        <Typography variant="h6">{recipe.name}</Typography>
       
        <Typography variant="body2">{moment(recipe.createdAt).fromNow()}</Typography>
      </div>
     
      {(user?.result?._id === recipe?.creator) && (
      <div className="overlay2">
        <Button onClick={() => setCurrentId(recipe._id)} style={{ color: 'white' }} size="small">
          {/* <MoreHorizIcon fontSize="default" /> */}
          Edit
        </Button>
      </div>
      )}
        <Typography variant="body2" color="textSecondary" component="h2">{recipe.tags.map((tag) => `#${tag} `)}</Typography>

      <CardActions>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeRecipe(recipe._id))}>
          <Likes />
        </Button>
        
        {(user?.result?._id === recipe?.creator) && (

        <Button size="small" color="primary" onClick={() => dispatch(deleteRecipe(recipe._id))}><DeleteIcon fontSize="small" /> Delete</Button>
        )}
        {(user?.result?._id === recipe?.creator) && (

        <Button onClick={openRecipe}>Check</Button>
        )}

        </CardActions>
     
     
    </Card>
  )
}

export default Recipe