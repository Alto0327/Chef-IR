import { useState } from "react";
import ClaudeRecipe from './components/ClaudeRecipe'
import IngredientsList from "./components/IngredientList";
import { getRecipeFromMistral } from "./ai";

export default function Main(){
    const [ingredients, setIngredients] = useState([])    
    const [recipe, setRecipe] = useState("")


    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")?.trim();
        setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
    }

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromMistral(ingredients)
        setRecipe(recipeMarkdown);
    }

    return (
    <main>
        <form className="add-ingredient-form" action={addIngredient}>
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