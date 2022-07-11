import express from 'express';

import mongoose from "mongoose"
import Recipe from "../models/recipe.js"

const router = express.Router();


export const getRecipes = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 2;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await Recipe.countDocuments({});
        const recipes = await Recipe.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: recipes, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


export const createRecipe = async (req, res) => {
    const recipe = req.body;

    const newRecipe = new Recipe({...recipe, creator: req.userId, createdAt: new Date().toISOString()});
    try {
        await newRecipe.save()
        res.status(201).json(newRecipe)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}



export const getRecipesBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const name = new RegExp(searchQuery, "i");
        const recipes = await Recipe.find({ $or: [ { name }, { tags: { $in: tags.split(',') } } ]});
        res.json({ data: recipes });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}



export const getRecipe = async (req, res) => { 
    const { id } = req.params;

    try {
        const recipe = await Recipe.findById(id);
        
        res.status(200).json(recipe);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const updateRecipe = async (req, res ) => {
    const {id: _id} = req.params;
    const recipe = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No recipe with that id')

    const updatedRecipe = await Recipe.findByIdAndUpdate(_id, {...recipe, _id}, {new: true})

    res.json(updatedRecipe)

}

export const deleteRecipe = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No recipe with id: ${id}`);

    await Recipe.findByIdAndRemove(id);

    res.json({ message: "Recipe deleted successfully." });
}

export const likeRecipe = async (req, res) => {

    const {id} = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated.'})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No recipe with that id')

    const recipe = await Recipe.findById(id)

    const index = recipe.likes.findIndex((id) => id === String(req.userId))

    if(index === -1){
        //like the recipe
        recipe.likes.push(req.userId)
    }else{
        //dislike the recipe
        recipe.likes = recipe.likes.filter((id) => id !== String(req.userId))
    }
    const updatedRecipe = await Recipe.findByIdAndUpdate( id, recipe, { new: true})
    res.json(updatedRecipe)

}


export default router
