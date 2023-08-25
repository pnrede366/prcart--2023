import React from 'react'
import { navItems } from '../constant'

const TopHeader = () => {
    return (
        <div className="header">
            <div className="header__wrapper">
                {
                    navItems.map((item, index) => {
                        return (
                            <div className="header__navItem" key={index}>
                                <span className="header__navItem__icon">
                                    {item.icon}
                                </span>
                                <span className="header__navItem__text" onClick={item.onclick}>
                                    {item.text}
                                </span>
                            </div>
                        )
                    })
                }
            </div>
        </div>)
}

export default TopHeader