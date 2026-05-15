import axios from "axios";
import Cookies from "js-cookie";
let token = Cookies.get("authToken");
// const token = "123";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export const authSignUp = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}users`, data);
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const authLogin = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}users/login`,
      data
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const verifyOtp = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}users/verifyOtp`,
      data
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const uploadImages = async (data: any) => {
  let response: any = null;

  const dataa = {
    imageBase64: data,
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL_IMAGE}upload-image`,
      dataa,
      config
    );
    response = res?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getAllUsers = async () => {
  let response: any = null;
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}users`);
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const updateUser = async (id: any, data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_URL}users/${id}`,
      data,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const deleteUser = async (id: any) => {
  let response: any = null;
  // console.log("data", data);
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}users/${id}`,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const applyForVender = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}api/v1/users/vendor-request`,
      data,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const contactRequest = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}users/contact-request`,
      data,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getVendorRequests = async () => {
  let response: any = null;
  try {
    console.log("config :>> ", config);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}users/vendor-requests`,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const acceptVendorRequest = async (id: any) => {
  let response: any = null;
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_URL}users/vendor/approve/${id}`,
      {},
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getContacts = async () => {
  let response: any = null;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}users/contact-requests`
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const acceptContactRequest = async (id: any) => {
  let response: any = null;
  console.log("config :>> ", config);
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_URL}users/vendor/approve/${id}`,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const resolveContactRequest = async (id: string) => {
  let response: any = null;
  console.log("config :>> ", config);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}users/contact-request-resolve`,
      { id: id }
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const addCategory = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}product/create-category`,
      data
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const EditCategory = async (id: any, data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_URL}product/category/${id}`,
      data
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const deleteCategory = async (id: any) => {
  let response: any = null;
  // console.log("data", data);
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}product/category/${id}`
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getAllCategories = async () => {
  let response: any = null;
  // console.log("data", data);
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}product/categories`
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getCategoryById = async (id: any) => {
  let response: any = null;
  // console.log("data", data);
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}product/category/${id}`
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getSubCategoryById = async (id: any) => {
  let response: any = null;
  // console.log("data", data);
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}product/all-sub-category/${id}`
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const addProduct = async (data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}product/create-product`,
      data
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const updateProduct = async (id: any, data: any) => {
  let response: any = null;
  console.log("data", data);
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_URL}product/${id}`,
      data
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getAllProducts = async () => {
  let response: any = null;
  // console.log("data", data);
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}product`);
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const deleteProduct = async (productId: string) => {
  let response: any = null;
  // console.log("data", data);
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}product/${productId}`,
      config
    );
    response = res?.data;
    console.log("addAdministration response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getAllOrders = async () => {
  let response: any = null;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}order/orders`,
      config
    );
    response = res?.data;
    console.log("getAllOrders response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const getOrdersByVender = async () => {
  let response: any = null;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_URL}order/orders-by-vendor`,
      config
    );
    response = res?.data;
    console.log("getAllOrders response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};

export const updateOrder = async (orderId: string, data: any) => {
  let response: any = null;
  const dataa = {
    orderId: orderId,
    status: data.status,
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}order/update-order-status`,
      dataa,
      config
    );
    response = res?.data;
    console.log("updateOrder response from api :>> ", response);
  } catch (error) {
    console.log(error);
    return error;
  }
  return response;
};
