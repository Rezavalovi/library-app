import { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await Axios.get('http://localhost:3000/admin/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to fetch user data',
                icon: 'error'
            });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const role = localStorage.getItem("role");
        if (!token || role !== 'admin') {
            navigate('/login'); 
        } else {
            fetchUsers();
        }
    }, [navigate]);

    const handleLogout = () => {
        Swal.fire({
            title: 'Do you want to logout?',
            text: 'You will be redirected to the login page',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then(async (result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('role');
                navigate('/login');

                Swal.fire({
                    title: 'Logged Out!',
                    text: 'You have been logged out successfully',
                    icon: 'success'
                });
            }
        });
    };

    const getStatus = (borrow) => {
        if (borrow.returnedAt) {
            return 'Returned';
        }

        const today = new Date();
        const borrowDate = new Date(borrow.borrowAt);
        const lateThreshold = new Date(today.setDate(today.getDate() - 30));

        if (borrowDate < lateThreshold) {
            return 'Late';
        } else {
            return 'Active';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="w-full bg-blue-600 p-4 flex justify-between items-center">
                <div className="text-white text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
                    Library App
                </div>
                <div className="flex gap-5">
                    <button 
                        className="p-2 bg-red-500 text-white rounded-lg"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Admin Page</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Book Title</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Return Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {users.length > 0 ? users.map((user) => (
                                user.borrows.length > 0 ? (
                                    user.borrows.map((borrow, index) => (
                                        <tr key={`${user.email}-${index}`} className="border-b border-gray-200">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{borrow.bookTitle}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {getStatus(borrow)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {borrow.returnedAt === null || borrow.returnedAt === undefined ? 'Not Returned' : 'Returned'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr className="border-b border-gray-200">
                                        <td className="px-6 py-4 text-sm text-gray-500" colSpan="4">
                                            {user.email} - No books borrowed
                                        </td>
                                    </tr>
                                )
                            )) : (
                                <tr>
                                    <td className="px-6 py-4 text-sm text-gray-500" colSpan="4">No users found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
