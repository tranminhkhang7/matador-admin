import React, { useState } from 'react';
import storage from '../../firebase';
import {
    ref,
    uploadBytes,
    getDownloadURL
} from "firebase/storage";

import { v4 } from "uuid";
import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import Tooltip from '../../components/Tooltip';

function AddBook() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [price, setPrice] = useState();
    // const [imageLink, setImageLink] = useState("");
    const [description, setDescription] = useState("");
    const [quantityLeft, setQuantityLeft] = useState();

    const [imageFile, setImageFile] = useState();


    const handleAddBook = async (e) => {

        e && e.preventDefault();

        let imageLink = "abcd";

        const imageRef = ref(storage, `images/${imageFile.name + v4()}`);
        await uploadBytes(imageRef, imageFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageLink(url);
                imageLink = url;
                console.log("image222", imageLink);

                try {
                    BooksService.addNewBook(title, author, publisher, price,
                        imageLink, description, quantityLeft).then(
                            () => {
                                history.push('/bookmanagement');
                                // window.location.reload();
                            },
                            (error) => {
                                console.log(error);
                            }
                        );
                } catch (err) {
                    console.log(err);
                }
            });
        });
    };


    return (

        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>

                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Page header */}
                        <div className="mb-8">
                            <h1 className="text-2xl md:text-3xl text-slate-800 font-bold">Add a new Book 📗</h1>
                        </div>
                        <form onSubmit={handleAddBook}>
                            <div className="grid gap-5 md:grid-cols-1">

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="default">
                                        Title <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        id="default"
                                        className="form-input w-full"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required />
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="default">
                                            Author <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            required
                                            id="default"
                                            className="form-input w-full"
                                            type="text"
                                            value={author}
                                            onChange={(e) => setAuthor(e.target.value)} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="default">
                                            Publisher <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            required
                                            id="default"
                                            className="form-input w-full"
                                            type="text"
                                            value={publisher}
                                            onChange={(e) => setPublisher(e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid gap-5 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="default">
                                            Quantity left <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            required
                                            id="default"
                                            className="form-input w-full"
                                            type="number"
                                            min={0}
                                            step={1}
                                            value={quantityLeft}
                                            onChange={(e) => setQuantityLeft(e.target.value)} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="default">
                                            Price <span className="text-rose-500">*</span>
                                        </label>
                                        <input
                                            required
                                            id="default"
                                            className="form-input w-full"
                                            type="number"
                                            min={0}
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="default">
                                        Description <span className="text-rose-500">*</span>
                                    </label>
                                    <textarea
                                        required
                                        id="default"
                                        className="form-input w-full"
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="default">
                                        Image <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        id="default"
                                        className="form-input w-full"
                                        type="file"
                                        onChange={(e) => setImageFile(e.target.files[0])} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="default">
                                        Status <span className="text-rose-500">*</span>
                                    </label>
                                    <select id="country" className="form-select">
                                        <option>Italy</option>
                                        <option>USA</option>
                                        <option>United Kingdom</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="default">
                                        Genre <span className="text-rose-500">*</span>
                                    </label>
                                    <div className="flex flex-wrap items-center -m-3">
                                        <div className="m-3">
                                            {/* Start */}
                                            <label className="flex items-center">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span className="text-sm ml-2">Active</span>
                                            </label>
                                            {/* End */}
                                        </div>

                                        <div className="m-3">
                                            {/* Start */}
                                            <label className="flex items-center">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span className="text-sm ml-2">Active</span>
                                            </label>
                                            {/* End */}
                                        </div>

                                        <div className="m-3">
                                            {/* Start */}
                                            <label className="flex items-center">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span className="text-sm ml-2">Active</span>
                                            </label>
                                            {/* End */}
                                        </div>

                                        <div className="m-3">
                                            {/* Start */}
                                            <label className="flex items-center">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span className="text-sm ml-2">Active</span>
                                            </label>
                                            {/* End */}
                                        </div>
                                    </div>
                                </div>

                                <div className="m-1.5" style={{ display: "flex", justifyContent: "center" }}>
                                    <button className="btn border-slate-200 hover:border-slate-300 text-slate-600" style={{ marginRight: "20px" }}>Cancel</button>
                                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" type="submit">Post</button>
                                </div>


                            </div>







                        </form>
                    </div>

                </main>
            </div>
        </div>

    );
}

export default AddBook;