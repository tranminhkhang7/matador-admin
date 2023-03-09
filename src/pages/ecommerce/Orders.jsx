import React, { useState } from 'react';

import storage from '../../firebase';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";
import { v4 } from "uuid";

import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import SearchForm from '../../partials/actions/SearchForm';
import PaginationNumeric from '../../components/PaginationNumeric';
import ModalBasic from '../../components/ModalBasic';
import OrdersTable from './orders/OrdersTable';

function Orders() {

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
  const [imageFile, setImageFile] = useState();


  const onAdd = async (e) => {
    console.log(title, author);
    // ShelfTypeServices.addShelfType(idAsset, updateAssetObj)
    //   .then((res) => {

    //   })
    //   .catch((e) => {

    //   });

    e && e.preventDefault();
    let imageLink = "abcd";
    const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
    await uploadBytes(imageRef, imageFile).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            console.log("image ne", url);
            // setImageLink(url);
            imageLink = url;
            // console.log("image222", imageLink);

            // try {
            //     BooksService.addNewBook(title, author, publisher, price,
            //         imageLink, description, quantityLeft).then(
            //             () => {
            //                 history.push('/bookmanagement');
            //                 // window.location.reload();
            //             },
            //             (error) => {
            //                 console.log(error);
            //             }
            //         );
            // } catch (err) {
            //     console.log(err);
            // }
        });
    });
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
                  <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Order 🚩</h1>
                </div>

                {/* Right: Actions */}
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                  {/* Search form */}
                  <SearchForm placeholder="Search orders" />
                  {/* Create invoice button */}

                 
                </div>

              </div>


              {/* Table */}
              <OrdersTable selectedItems={handleSelectedItems} />

              {/* Pagination */}
              <div className="mt-8">
                <PaginationNumeric />
              </div>
              
            </div>
          </main>

        </div>

      </div>


      {/* Modal add a book */}
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
              <input
                id="name" className="form-input w-full px-2 py-1" type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              
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

export default Orders;