import { useNavigate } from "react-router-dom";
import Cards from "../components/Card";
import Swal from "sweetalert2";
import Axios from "axios";
import { useEffect, useState } from "react";

export const Home = () => {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");

    const fetchData = async () => {
        try {
            const response = await Axios.get(`http://localhost:3000/books`);
            console.log(response.data, "<<<<< Dataaa");
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: "Do you want to logout?",
            text: "Yang Bener",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("access_token");
                navigate("/login");

                Swal.fire({
                    title: "Successfully!",
                    text: "See you!!",
                    icon: "success"
                });
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCardClick = (id) => {
        navigate(`/${id}`);
    };

    const handleBorrow = (id) => {
        Swal.fire({
            title: "Do you want to borrow this book?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire("Borrowed!", "You have borrowed the book.", "success");
            }
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchData();
        }
    };

    const handleFavorite = () => {
        navigate(`/borrows`);
    };

    return (
        <>
            <div className='px-5 w-full bg-gray-50 min-h-screen'>
                <nav className='w-full bg-blue-600 p-4 flex justify-between items-center'>
                    <div className='text-white text-xl font-bold'>
                        Library App
                    </div>
                    <div className='flex items-center'>
                        <input
                            type='text'
                            name='search'
                            id='search'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-64 h-10 px-4 border border-gray-300 rounded-full text-sm focus:outline-none'
                            placeholder='Search for books'
                            autoComplete='off'
                            onKeyDown={handleKeyDown}
                        />
                        <button className="ml-4 p-2 bg-gray-200 text-blue-600 rounded-lg" onClick={handleFavorite}>My Borrows</button>
                        <button className="ml-4 p-2 bg-red-500 text-white rounded-lg" onClick={handleLogout}>Logout</button>
                    </div>
                </nav>

                <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {data.map((el) => (
                        <Cards 
                            key={el.id} 
                            id={el.id} 
                            title={el.title} 
                            author={el.author} 
                            image={el.image} 
                            onClick={() => handleCardClick(el.id)} 
                            onBorrow={() => handleBorrow(el.id)} 
                        />
                    ))}
                </div>
            </div>
        </>
    );
};
