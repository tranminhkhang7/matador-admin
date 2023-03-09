import React, { useState, useEffect } from 'react';
import OrdersTableItem from './OrdersTableItem';

//ADD MORE SERVICES AND LOAD DATA

function OrdersTable({
  selectedItems
}) {

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
      order_id: '0',
      address: 'if god forbid and fate should step ',
      phone: '$129.00',
      status: 'Pending',
      time: 'Dominik Lamakani',
      total_amount: '$123.90',
      customer_email: '33'
    },
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
      order_id: '0',
      address: 'if god forbid and fate should step ',
      phone: '$129.00',
      status: 'Pending',
      time: 'Dominik Lamakani',
      total_amount: '$123.90',
      customer_email: '33'
    },
    {
      order_id: '0',
      address: 'if god forbid and fate should step ',
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

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

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




  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">Orders <span className="text-slate-400 font-medium">number of orders</span></h2>
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
                      handleClick={handleClick}
                    />
                  )
                })
              }
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default OrdersTable;
