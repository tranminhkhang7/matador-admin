import React, { useState } from 'react';

import storage from '../../../firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";
import { v4 } from "uuid";

import ModalBasic from '../../../components/ModalBasic';
import ModalBlank from '../../../components/ModalBlank';

function BooksTableItem(props) {

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dangerModalOpen, setDangerModalOpen] = useState(false);

  const [title, setTitle] = useState();
  const [price, setPrice] = useState();
  const [author, setAuthor] = useState();
  const [publisher, setPublisher] = useState();
  const [desciption, setDescription] = useState();
  const [status, setStatus] = useState();
  const [quantityLeft, setQuantityLeft] = useState();
  const [image, setImage] = useState();
  const [imageFile, setImageFile] = useState();

  const onSaveEdit = async(e) => {
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


  const statusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-emerald-100 text-emerald-600';
      case 'Due':
        return 'bg-amber-100 text-amber-600';
      case 'Overdue':
        return 'bg-rose-100 text-rose-500';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };



  const [idDisabledBook, setIdDisabledBook] = useState();
  const [statusPopupDisableBook, setStatusPopupDisableBook] = useState(false);

  const openPopupDisableBook = (idBook) => {
    setIdDisabledBook(idBook);
    setStatusPopupDisableBook(true);
  }
  const closePopupDisableBook = () => setStatusPopupDisableBook(false);

  return (
    <>
      <tr>
        <td
          className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap"
          style={{ cursor: "pointer" }}
          onClick={(e) => { e.stopPropagation(); setDetailModalOpen(true); }}
        >
          <div className={`font-medium `}>{props.title}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-medium text-sky-500">{props.price}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`font-medium `}>{props.author}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`font-medium `}>{props.quantity_left}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(props.status)}`}>{props.status}</div>
        </td >
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="space-x-1">
            <button
              className="text-slate-400 hover:text-slate-500 rounded-full"
              onClick={(e) => { e.stopPropagation(); setEditModalOpen(true); }}
            >
              <span className="sr-only">Edit</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
              </svg>
            </button>

            <button
              className="text-rose-500 hover:text-rose-600 rounded-full"
              onClick={(e) => { e.stopPropagation(); setDangerModalOpen(true); }}
            >
              <span className="sr-only">Delete</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
              </svg>
            </button>
          </div>
        </td>
      </tr>



      {/* Modal book detail */}
      <ModalBasic id="feedback-modal" modalOpen={detailModalOpen} setModalOpen={setDetailModalOpen} title="Book Detail" >
        {/* Modal content */}
        <div className="px-5 py-4">

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Title</label>
              <input
                readOnly={true}
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Price</label>
              <input
                readOnly={true}
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Author</label>
              <input
                readOnly={true}
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Publisher</label>
              <input
                readOnly={true}
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.publisher}
                onChange={(e) => setPublisher(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="feedback">Description</label>
              <textarea
                readOnly={true}
                id="feedback" className="form-textarea w-full px-2 py-1" rows="4"
                defaultValue={props.description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>


            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Status</label>
              <input
                readOnly={true}
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Quantity left</label>
              <input
                readOnly={true}
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.quantity_left}
                onChange={(e) => setQuantityLeft(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="feedback">Image</label>
              <img src={`${props.image_link}`} alt="Girl in a jacket" width="auto" height="auto" />
            </div>


          </div>
        </div>
      </ModalBasic>





      {/* Modal edit a book */}
      <ModalBasic id="feedback-modal" modalOpen={editModalOpen} setModalOpen={setEditModalOpen} title="Edit the Book">
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="space-y-3">

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Title</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.title}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Price</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.price}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Author</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.author}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Publisher</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.publisher}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="feedback">Description</label>
              <textarea
                id="feedback" className="form-textarea w-full px-2 py-1" rows="4"
                defaultValue={props.description}
              ></textarea>
            </div>


            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Status</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.status}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Quantity left</label>
              <input
                id="name" className="form-input w-full px-2 py-1" type="text"
                defaultValue={props.quantity_left}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="feedback">Image</label>
              <img src={`${props.image_link}`} alt="Girl in a jacket" width="auto" height="auto" />
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
                onSaveEdit();
              }}
            >Save</button>
          </div>
        </div>
      </ModalBasic>






      {/* Modal disable a book */}
      <ModalBlank id="danger-modal" modalOpen={dangerModalOpen} setModalOpen={setDangerModalOpen}>
        <div className="p-5 flex space-x-4">

          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
            <svg className="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>

          <div>

            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">Disable this book?</div>
            </div>

            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>
                  To delete this book means that you disable the status. You can undo this action after. Are you sure? (pải ghi dài dài ko thôi nó lỗi css soggy)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-end space-x-2">
              <button className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600" onClick={(e) => { e.stopPropagation(); setDangerModalOpen(false); }}>Cancel</button>
              <button className="btn-sm bg-rose-500 hover:bg-rose-600 text-white">Yes, Disable it</button>
            </div>
          </div>
        </div>
      </ModalBlank>


    </>
  );
}

export default BooksTableItem;
