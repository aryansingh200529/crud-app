import React, { useState, useEffect } from 'react';
import { bookbaseUrl } from '../../axiosinstance';
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

const Home = () => {
  const [bookForm, setBookForm] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: "",
    Id: "",
  });

  const [bookList, setBookList] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const getAllbookList = async () => {
    try {
      const { data } = await bookbaseUrl.get("booklists");
      setBookList(data?.BookList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllbookList();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await bookbaseUrl.delete(`deletebook/${id}`);
      if (data?.Success) {
        alert(data?.Message);
        getAllbookList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (
        !bookForm.BookName.trim() ||
        !bookForm.BookTitle.trim() ||
        !bookForm.Author.trim() ||
        !bookForm.SellingPrice.trim()
      ) {
        alert("All fields are required");
        return;
      }

      const endpoint = isUpdating ? "/updatebook" : "/addbook";
      const method = isUpdating ? bookbaseUrl.put : bookbaseUrl.post;

      const { data } = await method(endpoint, bookForm);

      if (data?.Success) {
        alert(data?.Message);
        getAllbookList();
        setBookForm({
          BookName: "",
          BookTitle: "",
          Author: "",
          SellingPrice: "",
          PublishDate: "",
          Id: "",
        });
        setIsUpdating(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (data) => {
    setBookForm({
      BookName: data?.BookName,
      BookTitle: data?.BookTitle,
      Author: data?.Author,
      SellingPrice: data?.SellingPrice,
      PublishDate: data?.PublishDate,
      Id: data?._id,
    });
    setIsUpdating(true);
  };

  return (
    <div className="w-full px-6 py-6 bg-gray-50 min-h-[calc(100vh-64px)]">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">Manage Books</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {['BookName', 'BookTitle', 'Author', 'SellingPrice', 'PublishDate'].map((field, index) => (
          <div key={index} className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-700">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input
              type={field === 'PublishDate' ? 'date' : 'text'}
              placeholder={field}
              name={field}
              value={bookForm[field]}
              onChange={handleFormChange}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-purple-400 outline-none"
            />
          </div>
        ))}
      </div>

      <div className="w-full flex justify-end mt-6">
        <button
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-md transition duration-300"
          onClick={handleSubmit}
        >
          {isUpdating ? "UPDATE" : "SUBMIT"}
        </button>
      </div>

      <div className="mt-10">
        <table className="w-full text-sm text-left border border-gray-200 shadow-sm">
          <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Book Name</th>
              <th className="px-4 py-3">Book Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Selling Price</th>
              <th className="px-4 py-3">Publish Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {bookList.map((book, index) => (
              <tr key={index} className="hover:bg-gray-100 transition">
                <td className="px-4 py-2">{book.BookName}</td>
                <td className="px-4 py-2">{book.BookTitle}</td>
                <td className="px-4 py-2">{book.Author}</td>
                <td className="px-4 py-2">₹{book.SellingPrice}</td>
                <td className="px-4 py-2">{book.PublishDate}</td>
                <td className="px-4 py-2 flex gap-3 justify-center">
                  <button
                    className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full"
                    onClick={() => handleDelete(book._id)}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className="bg-green-100 hover:bg-green-200 text-green-600 p-2 rounded-full"
                    onClick={() => handleUpdate(book)}
                  >
                    <FaPen />
                  </button>
                </td>
              </tr>
            ))}
            {bookList.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No books available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;



