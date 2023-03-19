import React, { useState, useEffect } from 'react';
import BookService from '../../../services/BookService';
import BooksTableItem from './BooksTableItem';
import ReactPaginate from "react-paginate";
import '../../../css/pagination.css'

function BooksTable() {
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [list, setList] = useState([]);
  const [listGenre, setListGenre] = useState([]);

  const handlePageChange = (e) => {
    const { selected } = e;
    setCurrentPage(selected);
  };

  const books = [
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

  const loadAllBooks = () => {
    // setList(books);
    BookService.getAllBooks(currentPage, 100)
      .then((res) => {
        setTotalPage(res.data.totalPage)
        setList(res.data.listBook)
        console.log(res.data.listBook);
      })
      .catch((e) => { });

    BookService.getAllGenres()
      .then((res) => {
        setListGenre(res.data);
      })
      .catch((e) => { });
  };

  useEffect(() => {
    loadAllBooks();
  }, [currentPage]);

  return (
    <>
      <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
        <header className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">Books <span className="text-slate-400 font-medium"></span></h2>
        </header>
        <div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                <tr>
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold text-left">ID</div>
                  </th>
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
                        book_id={book.bookId}
                        author={book.author}
                        description={book.description}
                        image_link={book.imageLink}
                        price={book.price}
                        publisher={book.publisher}
                        quantity_left={book.quantityLeft}
                        status={book.status}
                        title={book.title}
                        genreName={book.genreName}
                        listGenre={listGenre}
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

export default BooksTable;
