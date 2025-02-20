import React from 'react';
import UsersComponent from "@/components/UsersComponent/UsersComponent";
import SearchComponent from "@/components/SearchComponent/SearchComponent";

const UsersPage = () => {
    return (
        <div>
            <SearchComponent searchType={"users"}/>
            <UsersComponent/>
        </div>
    );
};

export default UsersPage;