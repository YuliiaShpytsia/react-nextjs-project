import RecipesComponent from "@/components/RecipesComponent/RecipesComponent";
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import React from "react";


const RecipesPage = async () => {
    return <div>
        <SearchComponent searchType={"recipes"}/>
        <RecipesComponent/>
    </div>
};

export default RecipesPage;