import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    let dataForm = {
        email,
        password
    };

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await Axios.post('http://localhost:3000/login', dataForm);
            const { access_token, role, id } = data; 

            localStorage.setItem('access_token', access_token);
            localStorage.setItem('role', role); 
            localStorage.setItem('id', id);

            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            setError('Login failed. Please check your Email/Password.');
        }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">
                    Welcome
                </h1>
                <form className="mt-6" onSubmit={handleOnSubmit}>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            autoComplete="yes"
                            value={email}
                            onChange={(el) => setEmail(el.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            autoComplete="yes"
                            value={password}
                            onChange={(el) => setPassword(el.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Login
                        </button>
                    </div>
                </form>
                
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    <Link to="/register">
                        <span href="" className="font-medium text-blue-600 hover:underline">
                            Sign up
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
}
