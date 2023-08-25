import React from "react";
import "./header.scss";
import TopHeader from "./Chunks/TopHeader";
import HeaderSearch from "./Chunks/HeaderSearch";
import HeaderCategory from "./Chunks/HeaderCategory";

const Header = () => {
 

    return (
        <div>
            <TopHeader />
            <HeaderSearch />
            <HeaderCategory />
        </div>
    )
}

export default Header