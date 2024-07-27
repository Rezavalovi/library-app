import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage";
import RegisterPage from "../src/pages/RegisterPage";
import HomePage from "../src/pages/HomePage";
import BorrowPage from "../src/pages/BorrowPage";
import AdminPage from "../src/components/AdminPage"; 

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />,
        loader: () => {
            const isLogin = localStorage.getItem('access_token');
            if (isLogin) {
                const role = localStorage.getItem('role');
                if (role === 'admin') {
                    throw redirect('/admin');
                } else {
                    throw redirect('/');
                }
            }
            return null;
        }
    },
    {
        path: "/",
        element: <HomePage />,
        loader: () => {
            const isLogin = localStorage.getItem('access_token');
            if (!isLogin) {
                throw redirect('/login');
            }
            return null;
        }
    },
    {
        path: "/admin",
        element: <AdminPage />,
        loader: () => {
            const isLogin = localStorage.getItem('access_token');
            const role = localStorage.getItem('role');
            if (!isLogin || role !== 'admin') {
                throw redirect('/login');
            }
            return null;
        }
    },
    {
        path: "/register",
        element: <RegisterPage />
    },
    {
        path: "/borrows",
        element: <BorrowPage />
    },
]);

export default router;
