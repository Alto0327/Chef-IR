import { useState } from "react";
import ClaudeRecipe from './components/ClaudeRecipe'
import IngredientsList from "./components/IngredientList";
import { getRecipeFromMistral } from "./ai";

export default function Main(){
    const [ingredients, setIngredients] = useState([])    
    const [recipe, setRecipe] = useState("")


    function addIngredient(e){
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const newIngredient = formData.get("ingredient")?.trim() //?. is like saying: “if this exists, then call .trim().”
        setIngredients(
            prevIngredient => [
                ...prevIngredient,
                newIngredient
            ]
        )

        e.target.reset();
    }

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown);
    }

    return (
    <main>
        <form className="add-ingredient-form" onSubmit={addIngredient}>
            <input type="text" placeholder="e.g. oregano" aria-label="Add ingredient" name="ingredient"/>
            <button>Add Ingredients</button>
        </form>
        {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                />
            }
        {recipe && <ClaudeRecipe recipe={recipe}/>}
    </main>
    )
}