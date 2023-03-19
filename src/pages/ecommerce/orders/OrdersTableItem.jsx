import React, { useEffect, useState } from 'react';

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
  const statusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-600';
      case 'pending':
        return 'bg-amber-100 text-amber-600';
      case 'canceled':
        return 'bg-rose-100 text-rose-500';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const [orderStatus, setOrderStatus] = useState(props.status);
  const [orderDetail, setOrderDetail] = useState();

  const onSaveEdit = async (e) => {
    // console.log("hello", props.order_id, orderStatus);
    OrderService.fetchChangeStatusOrder(props.order_id, orderStatus)
      .then((res) => {
        window.location.reload();
        // console.log(res.data.data);
      })
      .catch((e) => { });
  }



  // const [idDisabledBook, setIdDisabledBook] = useState();
  // const [statusPopupDisableBook, setStatusPopupDisableBook] = useState(false);

  // const openPopupDisableBook = (idBook) => {
  //   setIdDisabledBook(idBook);
  //   setStatusPopupDisableBook(true);
  // }
  // const closePopupDisableBook = () => setStatusPopupDisableBook(false);


  const loadAllOrderDetail = () => {
    OrderService.getAllOrderDetail(props.order_id)
      .then((res) => {
        console.log(res.data);
        setOrderDetail(res.data);
      })
      .catch((e) => { });
  };

  useEffect(() => {
    loadAllOrderDetail();
  }, []);

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
      <ModalBasic
        id="feedback-modal" modalOpen={detailModalOpen} setModalOpen={setDetailModalOpen} title="Book Detail" >
        {/* Modal content */}

        <table className="table-auto w-full">
          <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
            <tr>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">ID</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Title</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Author</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Quantity</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Price</div>
              </th>
              <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                <div className="font-semibold text-left">Image</div>
              </th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-slate-200">
            {orderDetail?.map(book => {
              return (
                <tr>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className={`font-medium `}>{book?.book?.bookId}</div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className={`font-medium `}>{book?.book?.title}</div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className={`font-medium `}>{book?.book?.author}</div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className={`font-medium `}>{book?.quantity}</div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className={`font-medium `}>{book?.price}</div>
                  </td>
                  <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <img src={`${book?.book?.imageLink}`} alt="Girl in a jacket" width="auto" height="auto" />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
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
                <option value="delivered">Delivered</option>
                <option value="pending">Pending</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
            <p>
              <i>
                * After changing the status of the order, there will be a notification sent to the customer about the changing on their order. Please make sure you want to change the status.
              </i>
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
