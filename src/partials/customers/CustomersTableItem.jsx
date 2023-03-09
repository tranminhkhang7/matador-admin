import React from 'react';

function CustomersTableItem(props) {
  return (
    <tr>


      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
            <img className="rounded-full" src={props.image} width="40" height="40" alt={props.name} />
          </div>
          <div className="font-medium text-slate-800">{props.name}</div>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.email}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.location}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.orders}</div>
      </td>
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-500">{props.lastOrder}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-emerald-500">{props.spent}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.refunds}</div>
      </td> */}
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">

        <button className="text-slate-400 hover:text-slate-500 rounded-full">
          <span className="sr-only">Menu</span>
          <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="2" />
            <circle cx="10" cy="16" r="2" />
            <circle cx="22" cy="16" r="2" />
          </svg>
        </button>
      </td> */}
      {/* <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="space-x-1">
          <a href="/ecommerce/books/edit">
            <button className="text-slate-400 hover:text-slate-500 rounded-full">
              <span className="sr-only">Edit</span>
              <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
              </svg>
            </button>
          </a>
        </div>
      </td> */}
    </tr>
  );
}

export default CustomersTableItem;
