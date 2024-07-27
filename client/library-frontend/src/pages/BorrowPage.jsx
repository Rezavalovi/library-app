import { useEffect, useState } from 'react';
import Axios from 'axios';
import Cards from '../components/Card';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Borrow = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await Axios({
        url: `http://localhost:3000/borrow/${userId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleLogout = () => {
    Swal.fire({
      title: 'Do you want to logout?',
      text: 'Yang Bener',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('access_token');
        navigate('/login');

        Swal.fire({
          title: 'Successfully!',
          text: 'See you!!',
          icon: 'success'
        });
      }
    });
  }

  const handleGoHome = () => {
    navigate(`/`);
  };

  const handleCardClick = (id) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='px-5 w-full bg-gray-50 min-h-screen'>
      <nav className='w-full bg-blue-600 p-4 flex justify-between items-center'>
        <div className='text-white text-xl font-bold cursor-pointer' onClick={handleGoHome}>
          Library App
        </div>
        <div className="flex gap-5">
          <button className="m1-4 p-2 bg-red-500 text-white rounded-lg" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {data && data.length > 0 ? data.map((el) => (
          <Cards 
            key={el.id} 
            id={el.id} 
            title={el.Book.title} 
            author={el.Book.author} 
            image={el.Book.image} 
            onClick={() => handleCardClick(el.id)} 
            isFavorite={true}
          />
        )) : (
          <p className='text-center text-gray-600'>No borrowed books.</p>
        )}
      </div>
    </div>
  );
}

export default Borrow;
