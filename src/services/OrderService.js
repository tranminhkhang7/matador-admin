import axiosClient from "./AxiosCustom";

class OrderServices {
  getAllOrders(pageNo, pageSize) {
    pageNo = 0;
    pageSize = 3;
    return axiosClient.get(`/order/retrieve?pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  fetchChangeStatusOrder(idOrder, status) {
    return axiosClient.put(`/order/${idOrder}?status=${status}`);
  }

  // addCategory(categoryRequest) {
  //   return axiosClient.post("/category", categoryRequest);
  // }
}
export default new OrderServices();
