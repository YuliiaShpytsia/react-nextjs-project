'use client'

import React, { useEffect, useState } from "react";
import UserComponent from "@/components/UserComponent/UserComponent";
import { getUserById, getRecipes } from "@/services/api.service";
import {IUser} from "@/models/IUser";
import {IRecipe} from "@/models/IRecipe";
import { useParams, useSearchParams } from "next/navigation";



const UserDetailsComponent = () => {
    const { id } = useParams<{ id: string }>(); // Типізація параметра id 
    const searchParams = useSearchParams();

    const page = searchParams.get("page") || "1";
    const [user, setUser] = useState<IUser | null>(null);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);

    useEffect(() => {
        if (!id) return;
        const fetchUser = async () => {
            const userData = await getUserById(id);
            setUser(userData);
        };

        const fetchRecipes = async () => {
            const response = await getRecipes(page); // Отримуємо всі рецепти
            const filteredRecipes = response.recipes.filter((r) => r.userId === Number(id));
            setRecipes(filteredRecipes);
        };

        fetchUser();
        fetchRecipes();
    }, [id, page]);

    if (!user) return <p>Завантаження...</p>;

    return (
        <div>
            <UserComponent user={user} recipes={recipes} />

            <div>
                <h3>Рецепти користувача</h3>
                {recipes.length > 0 ? (
                    <ul>
                        {recipes.map((recipe) => (
                            <li key={recipe.id}>
                                <a href={`/recipes/${recipe.id}`}>{recipe.name}</a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Цей користувач ще не створив жодного рецепта.</p>
                )}
            </div>
        </div>
    );
};

export default UserDetailsComponent;

