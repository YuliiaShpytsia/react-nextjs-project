'use client';
import { getRecipeById } from "@/services/api.service";
import RecipeComponent from "@/components/RecipeComponent/RecipeComponent";
import { useEffect, useState } from "react";
import { IRecipe } from "@/models/IRecipe";
import {useParams} from "next/navigation";

const RecipeDetailsComponent = () => {
    const { id } = useParams<{ id: string }>();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);

    useEffect(() => {
        getRecipeById(id).then(setRecipe);
    }, [id]);

    if (!recipe) {
        return <p>Завантаження...</p>;
    }

    return (
        <div>
            <RecipeComponent recipe={recipe} />
        </div>
    );
};

export default RecipeDetailsComponent;