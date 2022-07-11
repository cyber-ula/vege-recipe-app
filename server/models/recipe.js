import mongoose from 'mongoose';

const recipeSchema = mongoose.Schema({
    name: String,
    nutritionInfo: String,
    ingredients: String,
    directions: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String], 
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe