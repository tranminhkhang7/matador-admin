import axiosClient from "./AxiosCustom";

class BookServices {
  //admin
  getAllBooks(pageNo, pageSize) {
    return axiosClient.get(`/book/retrieve?pageNo=${pageNo}&pageSize=${pageSize}&sort=bookId&sortType=DESC`);
  }

  //admin
  getAllGenres() {
    return axiosClient.get(`/book/genre`);
  }

  //admin
  addBook(bookRequest) {
    return axiosClient.post("/book/add", bookRequest);
  }

  //admin
  updateBook(bookRequest) {
    return axiosClient.post("/book/update", bookRequest);
  }

  //   //admin
  //   addCategory(categoryRequest) {
  //     return axiosClient.post("/category", categoryRequest);
  //   }

  //   //admin
  //   updateCategory(categoryRequest) {
  //     return axiosClient.put("/category", categoryRequest);
  //   }

}
export default new BookServices();
