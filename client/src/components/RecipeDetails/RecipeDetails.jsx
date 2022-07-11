import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';

import { getRecipe } from '../../actions/recipes';

const Recipe = () => {
  const {recipe} = useSelector((state) => state.recipes);
  console.log(recipe)
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRecipe(id));
  }, [id, dispatch]);

 

  if (!recipe) return null;


  // if (isLoading) {
  //   return (
  //     <Paper elevation={6}>
  //       <CircularProgress size="7em" />
  //     </Paper>
  //   );
  // }

  


  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div>
        <div>
          <Typography variant="h3" component="h2">{recipe.name}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{recipe.tags?.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">
            {recipe.ingredients}
            </Typography>
          <Typography gutterBottom variant="body1" component="p">{recipe.directions}</Typography>
          <Typography gutterBottom variant="body1" component="p">{recipe.nutritionInfo}</Typography>
          <Typography variant="body1">{moment(recipe.createdAt).fromNow()}</Typography>
          
        </div>
        <div>
          <img src={recipe.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={recipe.name}  width={300}/>
        </div>
      </div>
      
    </Paper>
  );
};

export default Recipe;