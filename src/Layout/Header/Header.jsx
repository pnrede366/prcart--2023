import React from "react";
import "./header.scss";
import HeaderSearch from "./Chunks/HeaderSearch";
import HeaderActions from "./Chunks/HeaderActions";
import { useLocation } from "react-router";

const Header = () => {
    const location = useLocation()
    const pathmatch = location.pathname === "/"
    return (
        <div className="header__navWrapper">
            <HeaderActions />
            {
                pathmatch &&
                <HeaderSearch />
            }
        </div>
    )
}

export default Header