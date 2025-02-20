import {IRecipe} from "@/models/IRecipe";
import {FC} from "react";
import styles from "./RecipeComponent.module.css";
import Link from "next/link"

type RecipePropsType = {
    recipe: IRecipe;
};

const RecipeComponent: FC<RecipePropsType> = ({recipe}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{recipe.name}</h2>
            <img src={recipe.image} alt={recipe.name} className={styles.image}/>

            <div className={styles.details}>
                <p><strong>Час приготування:</strong> {recipe.cookTimeMinutes} хв.</p>
                <p><strong>Час підготовки:</strong> {recipe.prepTimeMinutes} хв.</p>
                <p><strong>Порцій:</strong> {recipe.servings}</p>
                <p><strong>Рейтинг:</strong> ⭐ {recipe.rating} / 5</p>
            </div>

            <div className={styles.tags}>
                <h4>Теги:</h4>
                {recipe.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                ))}
            </div>

            <div className={styles.ingredients}>
                <h4>Інгредієнти:</h4>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div>

            <div className={styles.instructions}>
                <h4>Інструкція приготування:</h4>
                <ol>
                    {recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>


            <Link href={`/users/${recipe.userId}`} className={styles.author}>
                Автор рецепту
            </Link>
        </div>
    );
};

export default RecipeComponent;