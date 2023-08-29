import Desktop from "../Pages/Desktop/Desktop"
import Product from "../Pages/Product/Product"
import PageNotFound from "../Component/PageNotFound/PageNotFound"
import Login from "../Pages/Login/Login"
import Signup from "../Pages/Signup/Signup"
import Admin from "../Pages/Admin/Admin"
import Cart from "../Pages/Cart/Cart"
import User from "../Pages/User/User"
import Protected from "./Protected"
import Dashboard from "../Layout/Dashboard/Dashboard"

export const routes = [
    {
        path: "/",
        element: <Desktop />,
        childRoutes: [
            {
                index: true,
                element: <Dashboard />,
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
                path: "admin",
                element: <Admin />

            },
            {
                path: "cart",
                element: <Protected Component={Cart} />

            },
            {
                path: "user",
                element: <Protected Component={User} />
            },

        ]
    },
    {
        path: "*",
        element: <PageNotFound />
    }
]