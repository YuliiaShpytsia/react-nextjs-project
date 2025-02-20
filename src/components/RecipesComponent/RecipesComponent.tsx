'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {getRecipes, getRecipesByTag} from "@/services/api.service";
import { IRecipe } from "@/models/IRecipe";
import PaginationComponent from "@/components/PaginationComponent/PaginationComponent";
import styles from "./RecipesComponent.module.css";

const RecipesComponent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[]>([]);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [totalRecipes, setTotalRecipes] = useState<number>(0);

    const query = searchParams.get("query") || "";
    const page = searchParams.get("page") || "1";

    useEffect(() => {
        const fetchRecipes = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            if (query) {
                const response = await getRecipesByTag(query);
                setRecipes(response.recipes);
                setTotalRecipes(response.total);
            } else {
                const response = await getRecipes(page);
                setRecipes(response.recipes);
                setTotalRecipes(response.total);
            }
        };

        fetchRecipes();
    }, [page, query]);

    useEffect(() => {
        if (selectedTag) {
            setFilteredRecipes(recipes.filter((recipe) => recipe.tags.includes(selectedTag)));
        } else {
            setFilteredRecipes(recipes);
        }
    }, [recipes, selectedTag]);

    const handleTagClick = (tag: string) => {
        if (selectedTag === tag) {
            setSelectedTag(null);
            setFilteredRecipes(recipes);
            router.push(`/recipes?page=${page}`);  // Скидаємо фільтр за тегом
        } else {
            setSelectedTag(tag);
            router.push(`/recipes?page=${page}&query=${tag}`);  // Додаємо тег до запиту
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Список рецептів</h2>

            {selectedTag && (
                <div className={styles.filterContainer}>
                    <span className={styles.filterText}>Фільтр: {selectedTag}</span>
                    <button className={styles.resetButton} onClick={() => handleTagClick(selectedTag)}>Скинути</button>
                </div>
            )}

            <ul className={styles.recipeList}>
                {filteredRecipes.map((recipe) => (
                    <li key={recipe.id} className={styles.recipeItem}>
                        <Link href={`/recipes/${recipe.id}`} className={styles.recipeLink}>
                            {recipe.name}
                        </Link>
                        <div className={styles.tagsContainer}>
                            {recipe.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className={styles.tag}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    #{tag}
                                </span>
                            ))}
                            <hr className={styles.separator} />
                        </div>
                    </li>
                ))}
            </ul>

            <div className={styles.paginationContainer}>
                <PaginationComponent total={totalRecipes} />
            </div>
        </div>
    );
};

export default RecipesComponent;
