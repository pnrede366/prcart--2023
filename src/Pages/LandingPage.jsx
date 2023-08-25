import React from 'react'
import "./landing.scss"
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div>LandingPage
            <Link to="product">Product</Link>
        </div>
    )
}

export default LandingPage