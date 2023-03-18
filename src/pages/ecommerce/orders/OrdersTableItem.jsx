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
import OrderService from '../../../services/OrderService';

function OrdersTableItem(props) {

  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [dangerModalOpen, setDangerModalOpen] = useState(false);

  const [orderStatus, setOrderStatus] = useState(props.status);

  const onSaveEdit = async (e) => {
    // console.log("hello", props.order_id, orderStatus);
    OrderService.fetchChangeStatusOrder(props.order_id, orderStatus)
        .then((res) => {
            // console.log(res.data.data);

        })
        .catch((e) => {

        });
  }

  const statusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-600';
      case 'Pending':
        return 'bg-amber-100 text-amber-600';
      case 'Canceled':
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
          <div className={`font-medium `}>{props.order_id}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className="font-medium text-sky-500">{props.address}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`font-medium `}>{props.phone}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${statusColor(props.status)}`}>{props.status}</div>
        </td >
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`font-medium `}>{props.time}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`font-medium `}>{props.total_amount}</div>
        </td>
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
          <div className={`font-medium `}>{props.customer_email}</div>
        </td>
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
          </div>
        </td>
      </tr>

      {/* Modal order detail */}
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
      <ModalBasic id="feedback-modal" modalOpen={editModalOpen} setModalOpen={setEditModalOpen} title="Change Order's status">
        {/* Modal content */}
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Status</label>
              <select
                name="cars" id="cars" form="carform"
                defaultValue={props.status}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="Delivered">Delivered</option>
                <option value="Pending">Pending</option>
                <option value="Canceled">Canceled</option>
              </select>
            </div>
            <p>
              * After changing the status of the order, there will be a notification sent to the customer about the changing on their order. Please make sure you want to change the status.
            </p>
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
    </>
  );
}

export default OrdersTableItem;
