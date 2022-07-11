import express from 'express';
import {  getRecipes, getRecipesBySearch, createRecipe, getRecipe, updateRecipe, deleteRecipe, likeRecipe } from '../controllers/recipe.js';
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/search', getRecipesBySearch);
router.get('/', getRecipes);
router.get('/:id', auth, getRecipe);

router.post('/',auth, createRecipe)

router.patch('/:id',auth, updateRecipe);
router.delete('/:id',auth, deleteRecipe);
router.patch('/:id/likeRecipe',auth, likeRecipe);



export default router