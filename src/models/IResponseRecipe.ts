import {IRecipe} from "./IRecipe";

export interface IResponseRecipes {
    recipes: IRecipe[];
    total: number;
    skip: number;
    limit: number;
}