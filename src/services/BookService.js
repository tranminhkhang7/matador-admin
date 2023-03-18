import axiosClient from "./AxiosCustom";

class BookServices {
  //admin
  getAllBooks(pageNo, pageSize) {
    return axiosClient.get(`/book/retrieve?pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  //admin
  getAllGenres() {
    return axiosClient.get(`/book/genre`);
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
