import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 
    const [formError, setFormError] = useState(""); 

    const handleOnSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setFormError("");

        // Form validation
        if (!email || !password) {
            setFormError("All fields are required");
            return;
        }

        const dataForm = {
            email,
            password,
        };

        try {
            await Axios.post('http://localhost:3000/register', dataForm);

            // Show success alert
            Swal.fire({
                title: 'Success!',
                text: 'Registration successful. Please log in.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/login');
            });
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message); 
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-blue-700 uppercase">
                    Register
                </h1>
                <form className="mt-6" onSubmit={handleOnSubmit}>
                    {formError && (
                        <div className="mb-4 p-2 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-md">
                            {formError}
                        </div>
                    )}
                    {error && (
                        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded-md">
                            {error}
                        </div>
                    )}
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
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Sign Up
                        </button>
                    </div>
                </form>
                
                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    <Link to="/login">
                        <span className="font-medium text-blue-600 hover:underline">
                            Already have an account? Log In
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
}
