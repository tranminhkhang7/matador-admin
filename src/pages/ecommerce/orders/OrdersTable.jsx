import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import OrdersTableItem from './OrdersTableItem';

//ADD MORE SERVICES AND LOAD DATA

function OrdersTable() {
  const [totalPage, setTotalPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (e) => {
    const { selected } = e;
    setCurrentPage(selected);
  };

  const orders = [
    {
      order_id: '0',
      address: 'if god forbid and fate should step ',
      phone: '$129.00',
      status: 'Pending',
      time: 'Dominik Lamakani',
      total_amount: '$123.90',
      customer_email: '33'
    },
    {
      order_id: '1',
      address: 'please tell them my name',
      phone: '$129.00',
      status: 'Pending',
      time: 'Dominik Lamakani',
      total_amount: '$123.90',
      customer_email: '33'
    },
    {
      order_id: '2',
      address: 'if god forbid and fate should step ',
      phone: '$129.00',
      status: 'Pending',
      time: 'Dominik Lamakani',
      total_amount: '$123.90',
      customer_email: '33'
    },
    {
      order_id: '3',
      address: 'if god forbid and fate should step ',
      phone: '$129.00',
      status: 'Pending',
      time: 'Dominik Lamakani',
      total_amount: '$123.90',
      customer_email: '33'
    },
    {
      order_id: '4',
      address: 'and forces us to a goodbye ',
      phone: '$129.00',
      status: 'Pending',
      time: 'Dominik Lamakani',
      total_amount: '$123.90',
      customer_email: '33'
    }
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  const loadAllOrders = () => {
    setList(orders);
    // ShelfTypeServices.getAllShelfType()
    //     .then((res) => {
    //         // console.log(res.data.data);

    //     })
    //     .catch((e) => {

    //     });
  };

  useEffect(() => {
    loadAllOrders();
  }, []);

  return (
    <>
      <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
        <header className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">Orders <span className="text-slate-400 font-medium"></span></h2>
        </header>
        <div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                <tr>

                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Order ID</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Address</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Phone</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Status</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Time</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Total Amount</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Customer Email</div>
                  </th>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">Action</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-200">
                {
                  list.map(order => {
                    return (
                      <OrdersTableItem
                        key={order.order_id}
                        order_id={order.order_id}
                        address={order.address}
                        phone={order.phone}
                        status={order.status}
                        time={order.time}
                        total_amount={order.total_amount}
                        customer_email={order.customer_email}
                      />
                    )
                  })
                }
              </tbody>
            </table>

          </div>
        </div>
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageChange}
        pageRangeDisplayed={2}
        pageCount={totalPage}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        forcePage={currentPage}
        breakLinkClassName="page-break"
        disabledClassName="page-disable"
        pageLinkClassName="page-num"
        previousLinkClassName="page-pre"
        nextLinkClassName="page-next"
        activeLinkClassName="active"
      />

    </>
  );
}

export default OrdersTable;
