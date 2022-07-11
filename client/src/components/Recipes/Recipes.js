import { Grid, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import './recipes.scss'
import Recipe from './Recipe/Recipe';

function Recipes({ setCurrentId }) {
  const {recipes, isLoading} = useSelector((state) => state.recipes);
  console.log(recipes)
  if (!recipes.length && !isLoading) return 'No recipes';

  return (
    isLoading ? <CircularProgress /> : (
      <Grid container alignItems="stretch" spacing={3}>
        {recipes?.map((recipe) => (
          <Grid key={recipe._id} item xs={12} sm={12} md={6} lg={3}>
            <Recipe recipe={recipe} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};
export default Recipes