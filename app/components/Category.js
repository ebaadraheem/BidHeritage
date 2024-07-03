"use client";
import React, { useState, useEffect } from 'react';

const Category = () => {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (category.trim() !== '') {
            try {
                const response = await fetch('/api/category/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ category }),
                });
                const data = await response.json();
                if (data.success) {
                    setCategories(data.data.categories);
                    setCategory('');
                } else {
                    console.error('Error adding category:', data.error);
                }
            } catch (error) {
                console.error('Error adding category:', error);
            }
        }
    };

    useEffect(() => {
        // Fetch categories from the backend when the component mounts
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/category/all', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setCategories(data.categories);
                } else {
                    console.error('Error fetching categories:', data.error);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleDeleteCategory = async (index) => {
        try {

            const response = await fetch('/api/category/delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ index }),
            });
            const data = await response.json();
            if (data.success) {
                const newCategories = categories.filter((_, i) => i !== index);
                setCategories(newCategories);
            } else {
                console.error('Error deleting category:', data.error);
            }
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4  rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
            <form onSubmit={handleAddCategory} className="mb-4">
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Add a new category"
                    className="w-full p-2 border border-gray-300 rounded mb-2"
                />
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-[#CC5500] text-white font-semibold rounded-lg hover:bg-[#B64500] transition duration-200"
                >
                    Add Category
                </button>
            </form>
            <ul className="list-disc px-2 h-[360px] overflow-auto list-inside">
                {categories && categories.map((cat, index) => (
                    <li key={index} className="flex gap-1 p-1 rounded-md justify-between items-center mb-1">
                        <span>{cat}</span>
                        <button
                            onClick={() => handleDeleteCategory(index)}
                            className="px-2 py-1 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Category;



