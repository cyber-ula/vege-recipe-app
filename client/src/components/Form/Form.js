import { TextField, Button, Typography, Paper} from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createRecipe, updateRecipe } from '../../actions/recipes'
import './form.scss'

const Form = ({currentId, setCurrentId}) => {
  const [recipeData, setRecipeData] = useState({ name: '', nutritionInfo: '', ingredients:'', directions:'', tags:'', selectedFile: ''})
  const dispatch = useDispatch()
  const recipe = useSelector((state) => currentId? state.recipes.recipes?.find((r) => r._id === currentId): null)
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(()=> {
    if(recipe) setRecipeData(recipe)
  }, [recipe])
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId){
      dispatch(updateRecipe(currentId, {...recipeData}))

    }else{
      dispatch(createRecipe({...recipeData}))
    }
    clear();
  }

  const clear = () => {
    setCurrentId(null)
    setRecipeData({ name: '', nutritionInfo: '', ingredients:'', directions:'', tags:'', selectedFile: ''})
  }


  if(!user?.result?.name){
    return (
      <Paper>
        <Typography variant="h6" align="center">
          Please Sign In to create your own recipes and like other's recipes
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper elevation={16} className="paper">
      <form autoComplete='off' noValidate onSubmit={handleSubmit}>
          <Typography margin="dense" className="typo" variant="h6">{currentId? "Edit":"Create"} a Memory</Typography>
         
          <TextField 
          margin="dense"
          className="typo--1"
          name="name" 
          variant='outlined' 
          label="Name" 
          fullWidth
          value={recipeData.name}
          onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })} />
          <TextField 
          margin="dense"
          className="typo--1"
          name="nutritionInfo" 
          variant='outlined' 
          label="Nutrition Info" 
          fullWidth
          value={recipeData.nutritionInfo}
          onChange={(e) => setRecipeData({ ...recipeData, nutritionInfo: e.target.value })} />
          <TextField 
          margin="dense"
          className="typo--1"
          name="ingredients" 
          variant='outlined' 
          label="Ingredients" 
          fullWidth
          value={recipeData.ingredients}
          onChange={(e) => setRecipeData({ ...recipeData, ingredients: e.target.value })} />
          <TextField 
          margin="dense"
          className="typo--1"
          name="directions" 
          variant='outlined' 
          label="Directions" 
          fullWidth
          value={recipeData.directions}
          onChange={(e) => setRecipeData({ ...recipeData, directions: e.target.value })} />
          <TextField 
          margin="dense"
          className="typo--1"
          name="tags" 
          variant='outlined' 
          label="Tags" 
          fullWidth
          value={recipeData.tags}
          onChange={(e) => setRecipeData({ ...recipeData, tags: e.target.value.split(',') })} />
          <div>
              <FileBase
                 className="typo--1"
                type="file"
                multiple={false}
                onDone = {({base64}) => setRecipeData({ ...recipeData, selectedFile: base64})}
              />
          </div>
          <Button  className="typo--1" variant='contained' color='primary' size='large' type='submit' fullWidth style={{marginTop: '10px'}}>Submit</Button>
          <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth style={{marginTop: '10px'}}>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form