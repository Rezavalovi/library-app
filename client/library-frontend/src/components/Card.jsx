import React from 'react';

const Cards = ({ id, title, author, image, onClick, onBorrow, isFavorite }) => {
    return (
        <div className='w-[330px] h-[380px] rounded-md shadow-lg border'>
            <div className='w-[330px] h-[190px] bg-slate-100'>
                <img src={image} alt={title} className="w-full h-full object-cover rounded-t-md" />
            </div>
            <div className='p-4'>
                <h3 className='text-lg font-semibold'>{title}</h3>
                <p className='text-gray-600'>{author}</p>
                {!isFavorite && (
                    <button 
                        className='mt-4 bg-blue-500 text-white px-4 py-2 rounded-md'
                        onClick={onBorrow}
                    >
                        Borrow
                    </button>
                )}
            </div>
        </div>
    );
}

export default Cards;
