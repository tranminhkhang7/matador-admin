import React, { useState, useEffect } from 'react';
import BooksTableItem from './BooksTableItem';

function BooksTable({
  selectedItems
}) {

  const invoices = [
    {
      id: '0',
      title: 'if god forbid',
      price: '$129.00',
      status: 'Overdue',
      customer: 'Dominik Lamakani',
      issueddate: '22/07/2021',
      quantity: '33',
      type: 'Subscription',
    },
    {
      id: '1',
      title: 'and fate should step in',
      price: '$59.00',
      status: 'Paid',
      customer: 'Mark Cameron',
      issueddate: '19/07/2021',
      quantity: '33',
      type: 'Subscription',
    },
    {
      id: '2',
      title: 'if you have children some day',
      price: '$89.00',
      status: 'Paid',
      customer: 'Sergio Gonnelli',
      issueddate: '17/07/2021',
      quantity: '33',
      type: 'One-time',
    },
    {
      id: '3',
      title: 'PLEASE TELL THEM MY NAME',
      price: '$129.00',
      status: 'Due',
      customer: 'Manuel Garbaya',
      issueddate: '04/07/2021',
      quantity: '33',
      type: 'Subscription',
    },
    {
      id: '4',
      title: 'tell them how the crowds went wild',
      price: '$129.00',
      status: 'Due',
      customer: 'Cool Robot',
      issueddate: '04/07/2021',
      quantity: '33',
      type: 'Subscription',
    },
    {
      id: '5',
      title: 'tell them how i want they shime',
      price: '$129.00',
      status: 'Paid',
      customer: 'Mark Cameron',
      issueddate: '04/07/2021',
      quantity: '33',
      type: 'One-time',
    }
  ];

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(invoices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800">Books <span className="text-slate-400 font-medium">number of books</span></h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Title</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Price</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Customer</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Issued on</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Quantity</div>
                </th>
                {/* <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Type</div>
                </th> */}
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {
                list.map(invoice => {
                  return (
                    <BooksTableItem
                      key={invoice.id}
                      id={invoice.id}
                      invoice={invoice.title}
                      total={invoice.price}
                      status={invoice.status}
                      customer={invoice.customer}
                      issueddate={invoice.issueddate}
                      paiddate={invoice.quantity}
                      type={invoice.type}
                      handleClick={handleClick}
                      isChecked={isCheck.includes(invoice.id)}
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

export default BooksTable;
