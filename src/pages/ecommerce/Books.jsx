import React, { useEffect, useState } from 'react';

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
import DeleteButton from '../../partials/actions/DeleteButton';
import DateSelect from '../../components/DateSelect';
import FilterButton from '../../components/DropdownFilter';
import BooksTable from './books/BooksTable';
import PaginationNumeric from '../../components/PaginationNumeric';
import ModalBasic from '../../components/ModalBasic';
import BookService from '../../services/BookService';

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
  const [description, setDescription] = useState();
  const [status, setStatus] = useState("active");
  const [quantityLeft, setQuantityLeft] = useState();
  const [imageFile, setImageFile] = useState();
  const [checkedItems, setCheckedItems] = useState();

  const [errorDisplay, setErrorDisplay] = useState("none");
  const [listGenre, setListGenre] = useState([]);

  const handleCheck = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  const loadAllGenres = () => {
    BookService.getAllGenres()
      .then((res) => {
        setListGenre(res.data);
      })
      .catch((e) => { });
  };

  useEffect(() => {
    loadAllGenres();
  }, []);

  const onAdd = async (e) => {
    if (title == null || price == null || price == null
      || publisher == null || description == null || status == null
      || quantityLeft == null || imageFile == null) {
      setErrorDisplay("block");
    }

    let addedGenre = [];
    listGenre.forEach((item) => {
      if (checkedItems[item.genreName] == true) {
        addedGenre.push(item);
      }
    });

    e && e.preventDefault();
    // let imageLink = "abcd";
    const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
    await uploadBytes(imageRef, imageFile).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("imageURL", url);

        const bookRequest = {
          title: title,
          price: price,
          author: author,
          publisher: publisher,
          description: description,
          status: status,
          quantityLeft: quantityLeft,
          genreName: addedGenre,
          imageLink: url
        }

        BookService.addBook(bookRequest)
          .then((res) => {
            // console.log(res);
            setEditModalOpen(false);
            window.location.reload();
          })
          .catch((e) => { });
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
              <BooksTable

                selectedItems={handleSelectedItems} />









            </div>
          </main>

        </div>

      </div>


      {/* Modal add a book */}
      <ModalBasic id="feedback-modal" modalOpen={editModalOpen} setModalOpen={setEditModalOpen} title="Edit the Book">
        {/* Modal content */}
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
                id="name" className="form-input w-full px-2 py-1" type="number"
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
              <select
                name="status" id="status"
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="active">Active</option>
                <option value="disable">Disabled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Quantity left</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="number" min={0} step={1}
                onChange={(e) => setQuantityLeft(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Genre</label>
              {
                listGenre.map(genre => {
                  return (
                    <>
                      <label>
                        <input
                          type="checkbox"
                          name={genre.genreName}
                          // checked={checkedItems[genre]}
                          onChange={handleCheck}
                        /> &nbsp;
                      </label>
                      {genre.genreName}
                      &nbsp;&nbsp;&nbsp;&nbsp;

                    </>
                  )
                })
              }
            </div>



            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="feedback">Image</label>
              {/* <img src={`${props.image_link}`} alt="Girl in a jacket" width="auto" height="auto" /> */}
              <input
                id="name" className="form-input w-full px-2 py-1" type="file"
                onChange={(e) => { setImageFile(e.target.files[0]); setIsImageChange(true); }}
              />
            </div>

            <p style={{ color: "red", fontSize: "13px", display: `${errorDisplay}` }}><i>* Please fill all the fields before submitting.</i></p>
          </div>
        </div>
        {/* Modal footer */}
        <div className="px-5 py-4 border-t border-slate-200">
          <div className="flex flex-wrap justify-end space-x-2">
            <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setEditModalOpen(false); setCheckedItems([]); setIsImageChange(false); }}>Cancel</button>
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