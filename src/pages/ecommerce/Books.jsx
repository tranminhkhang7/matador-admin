import React, { useState } from 'react';

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import SearchForm from '../../partials/actions/SearchForm';
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import BooksTable from './books/BooksTable';
import PaginationNumeric from '../../components/PaginationNumeric';
import ModalBasic from '../../components/ModalBasic';

function Books() {

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [author, setAuthor] = useState();
  const [publisher, setPublisher] = useState();
  const [desciption, setDescription] = useState();
  const [status, setStatus] = useState();
  const [quantityLeft, setQuantityLeft] = useState();
  const [image, setImage] = useState();




  const onAdd = () => {
    console.log(title, author);
    // ShelfTypeServices.addShelfType(idAsset, updateAssetObj)
    //   .then((res) => {

    //   })
    //   .catch((e) => {

    //   });
  };







  return (
    <>
      <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

              {/* Page header */}
              <div className="sm:flex sm:justify-between sm:items-center mb-5">

                {/* Left: Title */}
                <div className="mb-4 sm:mb-0">
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Books 📚</h1>
                </div>

                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  {/* Search form */}
                  <SearchForm placeholder="Search books" />
                  {/* Create invoice button */}

                  <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={(e) => { e.stopPropagation(); setEditModalOpen(true); }}
                  >
                    <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                      <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>


                    <span className="hidden xs:block ml-2">Add A New Book</span>

                  </button>
                </div>

              </div>


              {/* Table */}
              <BooksTable selectedItems={handleSelectedItems} />

              {/* Pagination */}
              <div className="mt-8">
                <PaginationNumeric />
              </div>









            </div>
          </main>

        </div>

      </div>


      {/* Modal edit a type */}
      <ModalBasic id="feedback-modal" modalOpen={editModalOpen} setModalOpen={setEditModalOpen} title="Edit the Book">
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="space-y-3">

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Title</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Price</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Author</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Publisher</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="feedback">Description</label>
              <textarea
                id="feedback" className="form-textarea w-full px-2 py-1" rows="4"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>


            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Status</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Quantity left</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                onChange={(e) => setQuantityLeft(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="feedback">Image</label>

            </div>

          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setEditModalOpen(false); }}>Cancel</button>
            <button
              className="btn-sm bg-indigo-500 hover:bg-indigo-600 text-white"
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
            >Save</button>
          </div>
        </div>
      </ModalBasic>

    </>
  );
}

export default Books;