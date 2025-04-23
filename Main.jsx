import { useState } from "react";
import ClaudeRecipe from './components/ClaudeRecipe'
import IngredientsList from "./components/IngredientList";

export default function Main(){
    const [ingredients, setIngredients] = useState([])    
    const [recipeShown, setRecipeShown] = useState(false)


    function addIngredient(formData){
        const newIngredient = formData.get("ingredient")?.trim();
        setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
    }

    function toggleRecipe(){
		setRecipeShown(prevShown => !prevShown)
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
                    toggleRecipeShown={toggleRecipe}
                />
            }
        {recipeShown && <ClaudeRecipe/>}
    </main>
    )
}