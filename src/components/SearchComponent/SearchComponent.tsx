"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./SearchComponent.module.css";
import { IUser } from "@/models/IUser";
import { IRecipe } from "@/models/IRecipe";
import { searchRecipes, searchUsers } from "@/services/api.service";
import { IResponseUsers } from "@/models/IResponseUser";
import { IResponseRecipes } from "@/models/IResponseRecipe";

interface SearchProps {
    searchType: "recipes" | "users";
}

const SearchComponent: React.FC<SearchProps> = ({ searchType }) => {
    const [query, setQuery] = useState<string>(""); // Пошуковий запит
    const [results, setResults] = useState<IUser[] | IRecipe[]>([]); // Результати пошуку
    const [loading, setLoading] = useState<boolean>(false); // Статус завантаження
    const [error, setError] = useState<string | null>(null); // Помилка при пошуку
    const router = useRouter();

    const handleSearch = async () => {
        if (!query.trim()) return;

        setLoading(true);
        setError(null);

        try {
            let data: IResponseUsers | IResponseRecipes;

            // Звичайний пошук без пошуку за ID
            if (searchType === "users") {
                data = await searchUsers(query);
            } else {
                data = await searchRecipes(query);
            }

            // Перевірка типу та коректна індексація
            if ('users' in data) {
                setResults(data.users);
            } else if ('recipes' in data) {
                setResults(data.recipes);
            } else {
                setResults([]);
            }

            setLoading(false);

            if (data && ('users' in data || 'recipes' in data)) {
                router.push(`/${searchType}?query=${query}`);
            } else {
                setError("Нічого не знайдено");
            }
        } catch (err) {
            setLoading(false);
            setError("Сталася помилка при пошуку");
            console.error("Search error:", err);
        }
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder={`Пошук ${searchType === "recipes" ? "рецептів" : "користувачів"}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch} disabled={loading}>
                {loading ? "Завантаження..." : "Пошук"}
            </button>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.resultsContainer}>
                {results.length > 0 ? (
                    results.map((item) => (
                        <div key={item.id} className={styles.resultItem}>
                            <a href={`/${searchType}/${item.id}`}>
                                {searchType === "recipes"
                                    ? item.hasOwnProperty('name')
                                        ? (item as IRecipe).name
                                        : 'Unknown recipe'
                                    : item.hasOwnProperty('firstName')
                                        ? (item as IUser).firstName + ' ' + (item as IUser).lastName
                                        : 'Unknown user'}
                            </a>
                        </div>
                    ))
                ) : (
                    <p>Нічого не знайдено</p>
                )}
            </div>
        </div>
    );
};

export default SearchComponent;