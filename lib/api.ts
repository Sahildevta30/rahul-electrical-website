import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    return Promise.reject(err);
  }
);

export default api;

export const getProducts = (params?: object) => api.get("/products", { params });
export const getProduct = (slug: string) => api.get(`/products/${slug}`);
export const getCategories = () => api.get("/products/categories");
export const getServiceTypes = () => api.get("/bookings/service-types");
export const getSettings = () => api.get("/settings");
export const register = (data: object) => api.post("/auth/register", data);
export const login = (email: string, password: string) => api.post("/auth/login", { email, password });
export const sendOtp = (phone: string) => api.post("/auth/send-otp", { phone });
export const verifyOtp = (phone: string, otp: string, name?: string) =>
  api.post("/auth/verify-otp", { phone, otp, name });
export const getMe = () => api.get("/auth/me");
export const createOrder = (data: object) => api.post("/orders", data);
export const getMyOrders = () => api.get("/orders/my");
export const getOrder = (id: string) => api.get(`/orders/${id}`);
export const createBooking = (data: object) => api.post("/bookings", data);
export const getMyBookings = () => api.get("/bookings/my");
export const createReview = (data: object) => api.post("/reviews", data);
export const submitGeneralReview = (data: { name: string; rating: number; comment?: string }) =>
  api.post("/reviews/general", data);
export const getPublicReviews = () => api.get("/reviews/public");
export const getAddresses = () => api.get("/customers/addresses");
export const addAddress = (data: object) => api.post("/customers/addresses", data);
export const deleteAddress = (id: string) => api.delete(`/customers/addresses/${id}`);
