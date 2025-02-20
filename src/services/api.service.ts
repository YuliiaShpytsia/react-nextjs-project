import { IResponseUsers } from "@/models/IResponseUser";
import {IUser} from "@/models/IUser";
import { refreshToken } from "./auth.service";
import { IResponseRecipes } from "@/models/IResponseRecipe";
import {IRecipe} from "@/models/IRecipe";
import { baseUrl } from "@/constants/urls";
import {IAuthUser} from "@/models/IAuthUser";

const limit = 30;

export const getUsers = async (page: string): Promise<IResponseUsers> => {
    const token = localStorage.getItem("token");
    const skip = limit * (+page) - limit;

    try {
        const response = await fetch(`${baseUrl}/auth/users?skip=${skip}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            console.warn("Token expired. Trying to refresh...");
            await refreshToken();
            return getUsers(page);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const getUserById = async (id: string): Promise<IUser> => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${baseUrl}/auth/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 401) {
            console.warn("Token expired. Trying to refresh...");
            await refreshToken();
            return getUserById(id);
        }
        return await response.json();

    }
    catch (error) {
        console.log("Error fetching user:", error);
        throw error;
    }
};

export const getRecipes = async (page: string): Promise<IResponseRecipes> => {
    const token = localStorage.getItem("token");
    const skip = limit * (+page) - limit;

        try {
        const response = await fetch(`${baseUrl}/auth/recipes?skip=${skip}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 401) {
            console.warn("Token expired. Trying to refresh...");
            await refreshToken();
            return getRecipes(page);
        }

        return await response.json();
    } catch (error) {
            console.log("Error fetching user:", error);
        throw error;
    }
};

export const getRecipeById = async (id: string): Promise<IRecipe> => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${baseUrl}/auth/recipes/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "default",
        });
        if (response.status === 401) {
            console.warn("Token expired. Trying to refresh...");
            await refreshToken();
            return getRecipeById(id);
        }
        return await response.json();

    }
    catch (error) {
        console.log("Error fetching recipe:", error);
        throw error;
    }
};

export const getAuthUser = async (): Promise<IAuthUser> => {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${baseUrl}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "default",
        });
        if (response.status === 401) {
            console.warn("Token expired. Trying to refresh...");
            await refreshToken();
            return getAuthUser();
        }
        return await response.json();

    }
    catch (error) {
        console.log("Error fetching recipe:", error);
        throw error;
    }
};

export const searchRecipes = async (query: string): Promise<IResponseRecipes> => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${baseUrl}/auth/recipes/search?q=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "default",
        });
        if (response.status === 401) {
            console.warn("Token expired. Trying to refresh...");
            await refreshToken();
            return searchRecipes(query);
        }
        return await response.json();

    }
    catch (error) {
        console.log("Error fetching recipe:", error);
        throw error;
    }
};

export const searchUsers = async (query: string): Promise<IResponseUsers> => {
    const token = localStorage.getItem("token");
    
    try {
        const response = await fetch(`${baseUrl}/auth/users/search?q=${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "default",
        });
        if (response.status === 401) {
            console.warn("Token expired. Trying to refresh...");
            await refreshToken();
            return searchUsers(query);
        }
        return await response.json();

    }
    catch (error) {
        console.log("Error fetching user:", error);
        throw error;
    }
};

export const getRecipesByTag = async (query: string): Promise<IResponseRecipes> => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${baseUrl}/auth/recipes/tag/${query}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            cache: "default",
        });
        if (response.status === 401) {
            console.warn("Token expired. Trying to refresh...");
            await refreshToken();
            return getRecipesByTag(query);
        }
        return await response.json();

    }
    catch (error) {
        console.log("Error fetching recipe:", error);
        throw error;
    }
};
