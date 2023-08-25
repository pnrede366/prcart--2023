import Desktop from "../Pages/Desktop/Desktop"
import Product from "../Pages/Product/Product"
import LandingPage from "../Pages/LandingPage"
import PageNotFound from "../Component/PageNotFound/PageNotFound"
import Mobiles from "../Component/Mobiles/Mobiles"
import Login from "../Pages/Login/Login"
import Signup from "../Pages/Signup/Signup"

export const routes = [
    {
        path: "/",
        element: <Desktop />,
        childRoutes: [
            {
                index: true,
                element: <LandingPage />,
            },
            {
                path: "product",
                element: <Product />,
                childRoutes: [
                    {
                        path: "mobiles",
                        element: <Mobiles />,
                    }
                ]
            }
        ]
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "signup",
        element: <Signup />

    },
    {
        path: "*",
        element: <PageNotFound />
    }
]