import axiosClient from "./AxiosCustom";

class OrderServices {
  getAllOrders(pageNo, pageSize) {
    pageNo = 0;
    pageSize = 10;
    return axiosClient.get(`/admin/order/retrieve?pageNo=${pageNo}&pageSize=${pageSize}`);
  }

  getAllOrderDetail(orderId) {
    return axiosClient.get(`/admin/order/details?id=${orderId}`);
  }

  fetchChangeStatusOrder(idOrder, status) {
    return axiosClient.post(`admin/order/status?id=${idOrder}&status=${status}`);
  }

  // addCategory(categoryRequest) {
  //   return axiosClient.post("/category", categoryRequest);
  // }
}
export default new OrderServices();
