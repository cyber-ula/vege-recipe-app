import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, Button, TextField, AppBar } from '@mui/material';
import { useDispatch } from 'react-redux';
import ChipInput from 'material-ui-chip-input';
import { getRecipesBySearch } from '../../actions/recipes';

import { getRecipes } from '../../actions/recipes';
import Recipes from '../Recipes/Recipes';
import Form from '../Form/Form';
import Paginate from '../Pagination';
import { useNavigate, useLocation } from 'react-router-dom';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, [currentId, dispatch]);
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');


  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useNavigate();

  const searchRecipe = () => {
    if (search.trim() || tags) {
      dispatch(getRecipesBySearch({ search, tags: tags.join(',') }));
      history(`/recipes/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchRecipe();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
  return (
    <Grow in>
    <Container maxWidth="xl">
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={6} md={9}>
          <Recipes setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar style={{margin: '20px'}}  position="static" color="inherit">
            <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Recipes" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
            <ChipInput
              style={{ margin: '10px 0' }}
              value={tags}
              onAdd={(chip) => handleAddChip(chip)}
              onDelete={(chip) => handleDeleteChip(chip)}
              label="Search Tags"
              variant="outlined"
            />
            <Button onClick={searchRecipe} variant="contained" color="primary">Search</Button>
          </AppBar>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6} style ={{margin: '20px'}}>
              <Paginate page={page} />
            </Paper>
        </Grid>
      </Grid>
    </Container>
  </Grow>
);
};

export default Home