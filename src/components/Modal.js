import React, { useState } from 'react';

function Modal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [imageLink, setImageLink] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageLinkChange = (e) => {
    setImageLink(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit({ title, imageLink });
    onClose(); // Close the modal after submitting
  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full sm:max-w-4xl">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-xl leading-6 font-medium text-gray-900 mb-2">Create Social Media Post</h3>
                <div className="mt-2">
                  <label htmlFor="postTitle" className="block text-sm font-medium text-gray-700 mb-1">Post Title:</label>
                  <input
                    type="text"
                    id="postTitle"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-base border-gray-300 rounded-md mb-2 py-2 px-3"
                    placeholder="Enter post title..."
                    value={title}
                    onChange={handleTitleChange}
                  />

                  <label htmlFor="postImageLink" className="block text-sm font-medium text-gray-700 mb-1">Image Link:</label>
                  <input
                    type="text"
                    id="postImageLink"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-base border-gray-300 rounded-md mb-4 py-2 px-3"
                    placeholder="Enter image link..."
                    value={imageLink}
                    onChange={handleImageLinkChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-base">
              Submit
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-base">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;


