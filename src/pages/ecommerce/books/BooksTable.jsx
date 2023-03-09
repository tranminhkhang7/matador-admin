import React, { useState, useEffect } from 'react';
import BooksTableItem from './BooksTableItem';

function BooksTable({
  selectedItems
}) {

  const invoices = [
    {
      book_id: '0',
      author: 'if god forbid and fate should step in',
      description: '$129.00',
      image_link: 'https://cdn2.penguin.com.au/covers/original/9780099511021.jpg',
      price: 'Dominik Lamakani',
      publisher: '22/07/2021',
      quantity_left: '33',
      status: 'Subscription',
      title: "hehe"
    },
    {
      book_id: '0',
      author: 'if god forbid and fate should step in',
      description: '$129.00',
      image_link: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781501173219/all-the-light-we-cannot-see-9781501173219_hr.jpg',
      price: 'Dominik Lamakani',
      publisher: '22/07/2021',
      quantity_left: '33',
      status: 'Subscription',
      title: "hehe"
    },
    {
      book_id: '0',
      author: 'if god forbid and fate should step in',
      description: '$129.00',
      image_link: 'Overdue',
      price: 'Dominik Lamakani',
      publisher: '22/07/2021',
      quantity_left: '33',
      status: 'Subscription',
      title: "hehe"
    },
    {
      book_id: '0',
      author: 'if god forbid and fate should step in',
      description: '$129.00',
      image_link: 'Overdue',
      price: 'Dominik Lamakani',
      publisher: '22/07/2021',
      quantity_left: '33',
      status: 'Subscription',
      title: "hehe caicashdfjksdf fsdhfsd"
    },
    {
      book_id: '0',
      author: 'if god forbid and fate should step in',
      description: '$129.00',
      image_link: 'Overdue',
      price: 'Dominik Lamakani',
      publisher: '22/07/2021',
      quantity_left: '33',
      status: 'Subscription',
      title: "hehe"
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
                
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Title</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Price</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Author</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Quantity Left</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Status</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200">
              {
                list.map(book => {
                  return (
                    <BooksTableItem
                      key={book.book_id}
                      book_id={book.book_id}
                      author={book.author}
                      description={book.description}
                      image_link={book.image_link}
                      price={book.price}
                      publisher={book.publisher}
                      quantity_left={book.quantity_left}
                      status={book.status}
                      title={book.title}
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

export default BooksTable;
